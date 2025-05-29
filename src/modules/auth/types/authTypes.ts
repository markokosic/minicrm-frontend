export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export type LoginResponseData = {
  user: User;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  tenantId: number;
};
