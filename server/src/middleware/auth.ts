import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { jwtHelpers } from "../helpers/JWT.token";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/apiError";

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get authorization token
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    req.user = verifiedUser;
    // Authorization
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
