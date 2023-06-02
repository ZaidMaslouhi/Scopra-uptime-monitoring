export type ServerError = { message: string };

export const isServerError = (
  error: ServerError | unknown
): error is ServerError => {
  return (error as ServerError).message !== undefined;
};
