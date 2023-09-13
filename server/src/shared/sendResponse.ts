import { Response } from "express";
type IResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
};

const sendResponse = <T>(res: Response, data: IResponse<T>): void => {
  const responseData: IResponse<T> = {
    statusCode: data.statusCode,
    success: true,
    message: data.message || null,
    meta: data.meta || undefined,
    data: data.data || null,
  };
  res.status(data.statusCode).send(responseData);
};

export default sendResponse;
