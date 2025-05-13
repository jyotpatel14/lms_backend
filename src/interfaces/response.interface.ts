export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  data?: T | T[] | null;
  message?: string;
  count?: number;
}
