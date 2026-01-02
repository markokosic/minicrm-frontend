import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { User } from '../../types/auth.types';
import { configureAuth } from '../configureAuth';

const mockUser: User = {
  id: 1,
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max@example.com',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  tenantId: 1,
};

const mockLoginCredentials = {
  email: 'max@example.com',
  password: 'password123',
};

const mockRegisterCredentials = {
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'max@example.com',
  password: 'password123',
  confirmPassword: 'password123',
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { Wrapper, queryClient };
};

describe('configureAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useUser', () => {
    it('should invoke userFn and return user data', async () => {
      const mockGetUser = vi.fn().mockResolvedValue(mockUser);

      const { useUser } = configureAuth({
        userFn: mockGetUser,
        userKey: ['test-user'],
        loginFn: vi.fn(),
        registerFn: vi.fn(),
        logoutFn: vi.fn(),
      });

      const { Wrapper } = createWrapper();
      const { result } = renderHook(() => useUser(), {
        wrapper: Wrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockGetUser).toHaveBeenCalledTimes(1);

      expect(result.current.data).toEqual(mockUser);
    });
  });

  describe('useLogin', () => {
    it('should invoke loginFn and save user to cache', async () => {
      const mockLoginFn = vi.fn().mockResolvedValue(mockUser);
      const mockGetUser = vi.fn().mockResolvedValue(mockUser);

      const { useLogin } = configureAuth({
        userFn: mockGetUser,
        userKey: ['test-user'],
        loginFn: mockLoginFn,
        registerFn: vi.fn(),
        logoutFn: vi.fn(),
      });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useLogin(), {
        wrapper: Wrapper,
      });

      result.current.mutate(mockLoginCredentials);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockLoginFn).toHaveBeenCalledWith(
        expect.objectContaining(mockLoginCredentials),
        expect.any(Object)
      );
      expect(mockLoginFn).toHaveBeenCalledTimes(1);

      const cachedUser = queryClient.getQueryData(['test-user']);
      expect(cachedUser).toEqual(mockUser);
    });
  });

  describe('useRegister', () => {
    it('should invoke registerFn and save user to cache', async () => {
      const mockRegisterFn = vi.fn().mockResolvedValue(mockUser);
      const mockGetUser = vi.fn().mockResolvedValue(mockUser);

      const { useRegister } = configureAuth({
        userFn: mockGetUser,
        userKey: ['test-user'],
        loginFn: vi.fn(),
        registerFn: mockRegisterFn,
        logoutFn: vi.fn(),
      });

      const { Wrapper, queryClient } = createWrapper();
      const { result } = renderHook(() => useRegister(), {
        wrapper: Wrapper,
      });

      result.current.mutate(mockRegisterCredentials);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockRegisterFn).toHaveBeenCalledWith(
        expect.objectContaining(mockRegisterCredentials),
        expect.any(Object)
      );
      expect(mockRegisterFn).toHaveBeenCalledTimes(1);

      const cachedUser = queryClient.getQueryData(['test-user']);
      expect(cachedUser).toEqual(mockUser);
    });
  });

  describe('useLogout', () => {
    it('sollte logoutFn aufrufen und User aus Cache entfernen', async () => {
      // Arrange
      const mockLogoutFn = vi.fn().mockResolvedValue({ success: true });
      const mockGetUser = vi.fn().mockResolvedValue(mockUser);

      const { useLogout } = configureAuth({
        userFn: mockGetUser,
        userKey: ['test-user'],
        loginFn: vi.fn(),
        registerFn: vi.fn(),
        logoutFn: mockLogoutFn,
      });

      const { Wrapper, queryClient } = createWrapper();

      // Zuerst User im Cache setzen (simuliert eingeloggten Zustand)
      queryClient.setQueryData(['test-user'], mockUser);

      const { result } = renderHook(() => useLogout(), {
        wrapper: Wrapper,
      });

      // Act: Logout-Mutation ausführen
      result.current.mutate(undefined);

      // Assert: Warten, bis Mutation erfolgreich ist
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Assert: Prüfen, ob logoutFn aufgerufen wurde
      expect(mockLogoutFn).toHaveBeenCalledTimes(1);

      // Assert: Prüfen, ob User aus Cache entfernt wurde (sollte null sein)
      const cachedUser = queryClient.getQueryData(['test-user']);
      expect(cachedUser).toBeNull();
    });

    it('sollte custom onSuccess Callback aufrufen', async () => {
      const mockLogoutFn = vi.fn().mockResolvedValue({ success: true });
      const customOnSuccess = vi.fn();

      const { useLogout } = configureAuth({
        userFn: vi.fn(),
        userKey: ['test-user'],
        loginFn: vi.fn(),
        registerFn: vi.fn(),
        logoutFn: mockLogoutFn,
      });

      const { Wrapper } = createWrapper();
      const { result } = renderHook(
        () =>
          useLogout({
            onSuccess: customOnSuccess,
          }),
        {
          wrapper: Wrapper,
        }
      );

      result.current.mutate(undefined);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(customOnSuccess).toHaveBeenCalled();
    });
  });
});
