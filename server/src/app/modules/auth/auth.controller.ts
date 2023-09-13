import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUserResponse, IUser } from "./auth.interface";
import httpStatus from "http-status";
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body);
  res.cookie("token", result.accessToken, {
    expires: new Date(Date.now() + 25892000000),
    httpOnly: true,
  });
  sendResponse<IAuthUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Created successsully`,
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  res.cookie("token", result.accessToken, {
    expires: new Date(Date.now() + 25892000000),
    httpOnly: true,
  });
  sendResponse<IAuthUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully",
    data: result,
  });
});
const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("UnAuthorized Access");
  }
  const token = authHeader.split(" ")[1];
  const result = await AuthService.getUserByEmail(token as string);

  sendResponse<Pick<IUser, "email">>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User Retrive successsully`,
    data: result,
  });
});
export const AuthController = {
  createUser,
  loginUser,
  getUserByEmail,
};
