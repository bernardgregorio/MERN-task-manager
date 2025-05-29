import TitleService from "../services/TitleService.js";

class TitleController {
  async getTitles(req, res, next) {
    try {
      const titles = await TitleService.getAll();
      res.status(200).json(titles);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const title = await TitleService.getById(req.params.id);
      res.status(200).json(title);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async create(req, res, next) {
    try {
      const title = await TitleService.create(req.body);
      res.status(201).json({ message: "Title created", title });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateById(req, res, next) {
    try {
      const title = await TitleService.updateById(req.params.id, req.body);
      res.status(200).json({ message: "Title updated", title });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res, next) {
    try {
      await TitleService.deleteById(req.params.id);
      res.status(200).json({ message: "Title deleted" });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new TitleController();
