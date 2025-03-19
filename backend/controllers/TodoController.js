import TodoService from "../services/TodoService.js";
import { validationResult } from "express-validator";

class TodoController {
  async getAll(req, res, next) {
    try {
      const todos = await TodoService.getAll(
        req.query.page,
        req.query.limit,
        req.query.search
      );
      res.status(200).json(todos);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const todo = await TodoService.getById(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const todo = await TodoService.create(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateById(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const todo = await TodoService.updateById(req.params.id, req.body);
      res.status(200).json(todo);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res, next) {
    try {
      const todo = await TodoService.deleteById(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new TodoController();
