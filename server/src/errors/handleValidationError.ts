import mongoose from "mongoose";
import httpStatus from "http-status";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/error.interface";
const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (
      el: mongoose.Error.CastError | mongoose.Error.ValidatorError
    ): IGenericErrorMessage => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
