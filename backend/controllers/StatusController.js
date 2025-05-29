import StatusService from "../services/StatusService.js";

class StatusController {
  async findAll(req, res) {
    try {
      const status = await StatusService.findAll();
      res.status(200).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
  async findStatusByName(req, res) {
    try {
      const status = await StatusService.findStatusByName(req.params.name);
      res.status(200).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async findStatusById(req, res) {
    try {
      const status = await StatusService.findStatusById(req.params.id);
      res.status(200).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async createStatus(req, res) {
    try {
      const status = await StatusService.createStatus(req.body);
      res.status(201).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const status = await StatusService.updateStatus(req.params.id, req.body);
      res.status(200).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteStatus(req, res) {
    try {
      const status = await StatusService.deleteStatus(req.params.id);
      res.status(200).json(status);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new StatusController();
