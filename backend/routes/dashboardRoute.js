import express from "express";
import DashboardController from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/task", DashboardController.taskPriorityByPercentage);
router.get("/todo", DashboardController.todoByStatusCount);
router.get("/task-status", DashboardController.taskByStatus);

export default router;
