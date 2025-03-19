import PriorityService from "../services/PriorityService.js";

class PriorityController {
  async getPriorities(req, res, next) {
    try {
      const priorities = await PriorityService.getAll();
      res.status(200).json(priorities);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const priority = await PriorityService.getById(req.params.id);
      res.status(200).json(priority);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async createPriority(req, res, next) {
    try {
      const priority = await PriorityService.createPriority(req.body);
      res.status(201).json({ message: "Priority created", priority });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updatePriority(req, res, next) {
    try {
      const priority = await PriorityService.updatePriority(
        req.params.id,
        req.body
      );
      res.status(200).json({ message: "Priority updated", priority });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res, next) {
    try {
      await PriorityService.deleteById(req.params.id);
      res.status(200).json({ message: "Priority deleted" });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new PriorityController();
