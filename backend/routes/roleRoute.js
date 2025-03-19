import express from "express";
import RoleController from "../controllers/RoleController.js";

const router = express.Router();

router.get("/", RoleController.getRoles);
router.get("/:id", RoleController.getById);
router.post("/", RoleController.create);
router.put("/:id", RoleController.updateById);
router.delete("/:id", RoleController.deleteById);

export default router;
