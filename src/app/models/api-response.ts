export interface ApiResponse<T> {
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
  statusCode: string;
  data: T;
}
