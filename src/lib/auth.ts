import { getAuthUser, login, logout, register } from '@/features/auth/api/auth.api';
import { AuthCredentialsPayload, RegisterTenantPayload } from '@/features/auth/types/auth-types';
import { configureAuth } from '@/features/auth/utils/configureAuth';

export const getUser = async () => {
  const res = await getAuthUser();

  if (!res.success) {
    throw new Error(res.message);
  }

  return res?.data;
};

//TODO refactor, logout also can be unsuccessful i guess
const logoutUser = () => {
  return logout();
};

const loginUser = async (payload: AuthCredentialsPayload) => {
  const res = await login(payload);

  if (!res.success) {
    throw new Error(res.message);
  }

  return res?.data?.user;
};

const registerTenant = async (payload: RegisterTenantPayload) => {
  const res = await register(payload);

  if (!res.success) {
    throw new Error(res.message);
  }

  return res?.data;
};

const authConfig = {
  userFn: getUser,
  userKey: ['authenticated-user'],
  logoutFn: logoutUser,
  loginFn: async (data: AuthCredentialsPayload) => {
    const user = await loginUser(data);
    return user;
  },
  registerFn: async (data: RegisterTenantPayload) => {
    const response = await registerTenant(data);
    return response;
  },
};

export const { useUser, useLogin, useLogout, useRegister } = configureAuth(authConfig);
