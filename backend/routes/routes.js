import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import statusRoute from "./statusRoutes.js";
import taskRoute from "./taskRoute.js";
import todoRoute from "./todoRoute.js";
import priorityRoute from "./priorityRoute.js";
import todoStatusRoute from "./todoStatusRoute.js";
import roleRoute from "./roleRoute.js";
import titleRoute from "./titleRoute.js";
import dashboardRoute from "./dashboardRoute.js";
import { authJWT } from "../middlewares/auth.js";

const router = express.Router();

// Auth routes
router.use("/api/auth", authRoutes);

// Middleware for auth
router.use(authJWT);

// User routes
router.use("/api/users", userRoutes);

// Status routes
router.use("/api/status", statusRoute);

// Task routes
router.use("/api/tasks", taskRoute);

// Todo routes
router.use("/api/todos", todoRoute);

// Priority routes
router.use("/api/priorities", priorityRoute);

// Todo Status routes
router.use("/api/todostatuses", todoStatusRoute);

// Role routes
router.use("/api/roles", roleRoute);

// Title routes
router.use("/api/titles", titleRoute);

// Dashboard routes
router.use("/api/dashboard", dashboardRoute);

export default router;
