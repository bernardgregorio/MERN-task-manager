import express from "express";
import TaskController from "../controllers/TaskController.js";
import { checkSchema } from "express-validator";
import { createTask, updateTask } from "../validations/task.js";

const router = express.Router();

router.get("/without-todos", TaskController.getAllTaskByStatus);
router.get("/:id", TaskController.getById);
router.get("/", TaskController.getTasks);
router.post("/", checkSchema(createTask), TaskController.create);
router.put("/:id", checkSchema(updateTask), TaskController.updateById);
router.patch("/:id", checkSchema(updateTask), TaskController.updateById);
router.delete("/:id", TaskController.deleteById);

export default router;
