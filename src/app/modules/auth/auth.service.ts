/* eslint-disable @typescript-eslint/no-non-null-assertion */

import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userToken";
import { User } from "../user/user.model";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;

//   const isUserExists = await User.findOne({ email });
//   if (!isUserExists) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email dose not exists");
//   }

//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExists.password as string
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_GATEWAY, "Incorrect Password");
//   }
//   // JWT authntication
//   const userTokens = createUserToken(isUserExists);

//   const { password: pass, ...rest } = isUserExists.toObject();

//   return {
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest,
//   };
// };

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);
  const isOldPasswordExists = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPasswordExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );
  await user!.save();
};

export const AuthServices = {
  getNewAccessToken,
  resetPassword,
};
