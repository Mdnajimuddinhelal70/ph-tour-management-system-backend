/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

export const handlerCastError = (err: mongoose.Error.CastError) => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId, please provide a valid Id.",
  };
};
