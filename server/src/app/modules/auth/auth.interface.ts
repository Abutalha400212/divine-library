import { Model } from "mongoose";

export type IAuth = {
  email: string;
  password: string;
};
export type IUser = {
  password: string;
  name: string;
  email: string;
  role: string;
  profile_image: string;
};
export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
export type IUserFilter = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
};
export type AuthModel = Model<IAuth, Record<string, unknown>>;

export type IAuthUserResponse = {
  accessToken: string;
};
