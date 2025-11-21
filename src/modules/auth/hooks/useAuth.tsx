import { login } from '../api/authApi';
import { LoginInput } from '@/lib/auth';
import { LoginResponse } from '../types/authTypes';

export const useAuth = () => {
  const loginUser = async (payload: LoginInput): Promise<LoginResponse> => {
    const res = await login(payload);

    if (!res.success) {
      throw new Error(res.message);
    }

    return res;
  };
  return { loginUser };
};
