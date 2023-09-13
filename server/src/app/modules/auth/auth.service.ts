import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { IAuth, IAuthUserResponse, IUser } from "./auth.interface";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/JWT.token";
import { User } from "./auth.model";

const createUser = async (payload: IUser): Promise<IAuthUserResponse> => {
  const { email } = await User.create(payload);
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken,
  };
};
const getUserByEmail = async (
  token: string
): Promise<Pick<IUser, "email"> | null> => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  // verify token
  let verifiedUser = null;

  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  const { email } = verifiedUser;

  return { email };
};
const loginUser = async (payload: IAuth): Promise<IAuthUserResponse> => {
  const { email: userEmail, password } = payload;
  const isUserExist = await User.isUserExist(userEmail);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not Found");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is inCorrect");
  }
  const { email } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  loginUser,
  createUser,
  getUserByEmail,
};
