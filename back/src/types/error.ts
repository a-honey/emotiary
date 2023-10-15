export interface IError extends Error {
  statusCode?: number | null | undefined;
}
