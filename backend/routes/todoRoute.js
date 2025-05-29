import express from "express";
import { checkSchema } from "express-validator";
import TodoController from "../controllers/TodoController.js";
import { createTodo, updateTodo } from "../validations/todo.js";

const router = express.Router();

router.get("/", TodoController.getAll);
router.get("/:id", TodoController.getById);
router.post("/", checkSchema(createTodo), TodoController.create);
router.put("/:id", TodoController.updateById);
router.patch("/:id", checkSchema(updateTodo), TodoController.updateById);
router.delete("/:id", TodoController.deleteById);

export default router;
