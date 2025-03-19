import StatusRepository from "../repositories/StatusRepository.js";
import { createError } from "../utils/errorUtils.js";

class StatusService {
  async findAll() {
    const status = await StatusRepository.findAll();
    if (!status) throw createError("Status not found", 404);
    return status;
  }

  async getById(id) {
    const status = await StatusRepository.findById(id);
    if (!status) throw createError("Status not found", 404);
    return status;
  }

  async getByName(name) {
    const status = await StatusRepository.findByName(name);
    if (!status) throw createError("Status not found", 404);
    return status;
  }

  async create(data) {
    const statusExist = await StatusRepository.findByName(data.name);
    if (statusExist) throw createError("Status already exists.", 409);
    const status = await StatusRepository.create(data);
    if (!status) throw createError("Unable to create status", 500);
    return status;
  }
  async updateById(id, data) {
    const status = await StatusRepository.updateById(id, data);
    if (!status) throw createError("Status not found", 404);
    return status;
  }

  async deleteById(id) {
    const status = await StatusRepository.deleteById(id);
    if (!status) throw createError("Status not found", 404);
    return status;
  }
}

export default new StatusService();
