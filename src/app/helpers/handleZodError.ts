/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const handlerZodError = (err: any) => {
  return {
    statusCode: 400,
    message: "Zod Error",
  };
};
