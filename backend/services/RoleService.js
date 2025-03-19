import RoleRepository from "../repositories/RoleRepository.js";
import { createError } from "../utils/errorUtils.js";

class RoleService {
  async getAll() {
    const roles = await RoleRepository.findAll();
    if (!roles) throw createError("Roles not found", 404);
    return roles;
  }

  async getById(id) {
    const role = await RoleRepository.findById(id);
    if (!role) throw createError("Role not found", 404);
    return role;
  }

  async create(data) {
    const role = await RoleRepository.create(data);
    if (role) throw createError("Role already exists", 400);

    const newRole = await RoleRepository.create(data);
    if (!newRole) throw createError("Unable to create role", 500);
    return newRole;
  }

  async updateById(id, data) {
    const role = await RoleRepository.updateById(id, data);
    if (!role) throw createError("Unable to update role", 500);
    return role;
  }

  async deleteById(id) {
    const role = await RoleRepository.deleteById(id);
    if (!role) throw createError("Unable to delete role", 500);
    return role;
  }
}

export default new RoleService();
