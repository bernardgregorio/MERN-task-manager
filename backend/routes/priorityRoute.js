import express from "express";
import PriorityController from "../controllers/PriorityController.js";

const router = express.Router();

router.get("/:id", PriorityController.getById);
router.get("/", PriorityController.getPriorities);
router.post("/", PriorityController.createPriority);
router.put("/:id", PriorityController.updatePriority);
router.patch("/:id", PriorityController.updatePriority);
router.delete("/:id", PriorityController.deleteById);

export default router;
