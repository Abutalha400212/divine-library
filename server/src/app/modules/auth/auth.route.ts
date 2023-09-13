import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();
router.get("/get-user", AuthController.getUserByEmail);
router.post(
  "/signup",
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
