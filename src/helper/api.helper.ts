export function createResponse<T>(
  message: string,
  status: number,
  data: T | null = null,
): ApiResponse<T> {
  return {
    message,
    status,
    data,
  };
}
