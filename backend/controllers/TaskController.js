import TaskService from "../services/TaskService.js";
import { validationResult } from "express-validator";

class TaskController {
  async getTasks(req, res) {
    try {
      const tasks = await TaskService.findAll(
        req.query.page,
        req.query.limit,
        req.query.search
      );
      res.status(200).json(tasks);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const task = await TaskService.getById(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ message: error.array() });
      }

      const task = await TaskService.create(req.body);
      res.status(201).json({ message: "Task created", task });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateById(req, res) {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ message: error.array() });
      }
      const task = await TaskService.updateById(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res) {
    try {
      await TaskService.deleteById(req.params.id);
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getAllTaskByStatus(req, res) {
    try {
      const tasks = await TaskService.getAllTaskByStatus();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new TaskController();
