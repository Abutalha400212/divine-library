import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      await schema.parseAsync({
        body: payload,
        params: req.params,
        cookies: req.cookies,
        query: req.query,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;
