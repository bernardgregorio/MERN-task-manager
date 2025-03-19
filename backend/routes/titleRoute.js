import express from "express";
import TitleController from "../controllers/TitleController.js";

const router = express.Router();

router.get("/", TitleController.getTitles);
router.get("/:id", TitleController.getById);
router.post("/", TitleController.create);
router.put("/:id", TitleController.updateById);
router.delete("/:id", TitleController.deleteById);

export default router;
