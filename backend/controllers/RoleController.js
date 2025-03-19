import RoleService from "../services/RoleService.js";

class RoleController {
  async getRoles(req, res, next) {
    try {
      const roles = await RoleService.getAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async getById(req, res, next) {
    try {
      const role = await RoleService.getById(req.params.id);
      res.status(200).json(role);
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async create(req, res, next) {
    try {
      const role = await RoleService.create(req.body);
      res.status(201).json({ message: "Role created", role });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async updateById(req, res, next) {
    try {
      const role = await RoleService.updateById(req.params.id, req.body);
      res.status(200).json({ message: "Role updated", role });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }

  async deleteById(req, res, next) {
    try {
      await RoleService.deleteById(req.params.id);
      res.status(200).json({ message: "Role deleted" });
    } catch (error) {
      res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export default new RoleController();
