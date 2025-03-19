import express from "express";
import { checkSchema } from "express-validator";

import UserController from "../controllers/UserController.js";
import { createUserSchema, updateUserSchema } from "../validations/user.js";

const router = express.Router();

router.get("/all", UserController.getAllUsers);
router.get("/", UserController.findAll);
router.get("/:id", UserController.findUserById);
router.put("/:id", checkSchema(updateUserSchema), UserController.updateUser);
router.patch("/:id", checkSchema(updateUserSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.post(
  "/create",
  checkSchema(createUserSchema),
  UserController.createUser
);

export default router;
