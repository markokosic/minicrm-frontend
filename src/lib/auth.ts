import { AuthCredentialsPayload, RegisterTenantPayload } from '@/modules/auth/types/authTypes';
import { configureAuth } from '@/modules/auth/utils/configureAuth';
import { getAuthUser, login, logout, register } from '@/modules/auth/api/authApi';

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
