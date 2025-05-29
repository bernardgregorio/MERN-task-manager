import TodoStatusService from "../services/TodoStatusService.js";

class TodoStatusController {
  async getTodoStatuses(req, res, next) {
    try {
      const todoStatuses = await TodoStatusService.getAll();
      res.status(200).json(todoStatuses);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const todoStatus = await TodoStatusService.getById(req.params.id);
      res.status(200).json(todoStatus);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async createTodoStatus(req, res, next) {
    try {
      const todoStatus = await TodoStatusService.create(req.body);
      res.status(201).json({ message: "Todo status created", todoStatus });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateTodoStatus(req, res, next) {
    try {
      const todoStatus = await TodoStatusService.updateById(
        req.params.id,
        req.body
      );
      res.status(200).json({ message: "Todo status updated", todoStatus });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res, next) {
    try {
      await TodoStatusService.deleteById(req.params.id);
      res.status(200).json({ message: "Todo status deleted" });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new TodoStatusController();
