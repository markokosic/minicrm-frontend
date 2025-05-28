import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useCallback } from 'react';

type AuthConfig<User, LoginCredentials, RegisterCredentials> = {
  userFn: QueryFunction<User, QueryKey>;
  userKey: QueryKey;
  logoutFn: MutationFunction<unknown, unknown>;
  registerFn: MutationFunction<User, RegisterCredentials>;
  loginFn: MutationFunction<User, LoginCredentials>;
};

export const useAuth = <User, Error, LoginCredentials, RegisterCredentials>(
  config: AuthConfig<User, LoginCredentials, RegisterCredentials>
) => {
  const { userFn, userKey = ['authenticated-user'], loginFn, registerFn, logoutFn } = config;

  const useUser = (options?: Omit<UseQueryOptions<User, Error, LoginCredentials>, 'mutationFn'>) =>
    useQuery({
      queryKey: userKey,
      queryFn: userFn,
      ...options,
    });

  const useLogin = (options?: Omit<UseMutationOptions<User, Error, LoginCredentials>, 'mutationFn'>) => {
    const queryClient = useQueryClient();

    const setUser = useCallback((data: User) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: loginFn,
      ...options,
      onSuccess: (user, ...rest) => {
        setUser(user);
        options?.onSuccess?.(user, ...rest);
      },
    });
  };

  const useRegister = (options?: Omit<UseMutationOptions<User, Error, RegisterCredentials>, 'mutationFn'>) => {
    const queryClient = useQueryClient();

    const setUser = useCallback((data: User) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: registerFn,
      ...options,
      onSuccess: (user, ...rest) => {
        setUser(user);
        options?.onSuccess?.(user, ...rest);
      },
    });
  };

  const useLogout = (options?: Omit<UseMutationOptions<unknown, Error, unknown>, 'mutationFn'>) => {
    const queryClient = useQueryClient();

    const setUser = useCallback((data: User | null) => queryClient.setQueryData(userKey, data), [queryClient]);

    return useMutation({
      mutationFn: logoutFn,
      ...options,
      onSuccess: (...args) => {
        setUser(null);
        options?.onSuccess?.(...args);
      },
    });
  };

  return {
    useUser,
    useLogin,
    useRegister,
    useLogout,
  };
};
