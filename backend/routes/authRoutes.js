import express from "express";
import { checkSchema } from "express-validator";
import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";
import { createUserSchema } from "../validations/user.js";
import {
  authRefreshJWT,
  authVerifyJWT,
  googleAuth,
  googleAuthCallback,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refreshToken", authRefreshJWT, AuthController.refreshToken);

router.post(
  "/create",
  checkSchema(createUserSchema),
  UserController.createUser
);

export default router;
