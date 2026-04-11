export type ApiResponse<T = null> = ApiSuccessResponse<T> | ApiErrorResponse;

export type ApiSuccessResponse<T = null> = {
  statusCode: number;
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  statusCode: number;
  success: false;
  message: string;
  errors?: any; // Typ je nach Fehlerstruktur, z.B. string[] oder ValidationError[]
};

export type PaginatedList<T = any[]> = {
  content: T;
  first: boolean;
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};
