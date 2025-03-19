import express from "express";
import TodoStatusController from "../controllers/TodoStatusController.js";

const router = express.Router();

router.get("/", TodoStatusController.getTodoStatuses);
router.get("/:id", TodoStatusController.getById);
router.post("/", TodoStatusController.createTodoStatus);
router.put("/:id", TodoStatusController.updateTodoStatus);
router.delete("/:id", TodoStatusController.deleteById);

export default router;
