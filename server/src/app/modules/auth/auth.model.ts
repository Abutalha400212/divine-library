import { Schema, model } from "mongoose";
import { AuthModel, IAuth, IUser, UserModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const authSchema = new Schema<IAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: String,
      lastName: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    profile_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "email" | "password"> | null> {
  return await User.findOne({ email });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
export const Auth = model<IAuth, AuthModel>("Auth", authSchema);
