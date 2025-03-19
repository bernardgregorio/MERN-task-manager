import PriorityRepository from "../repositories/PriorityRepository.js";
import { createError } from "../utils/errorUtils.js";

class PriorityService {
  async getAll() {
    const priorities = await PriorityRepository.findAll();
    if (!priorities) throw createError("Priorities not found", 404);
    return priorities;
  }

  async getById(id) {
    const priority = await PriorityRepository.findById(id);
    if (!priority) throw createError("Priority not found", 404);
    return priority;
  }

  async create(data) {
    const priority = await PriorityRepository.findByName(data.title);
    if (priority) throw createError("Priority already exists", 400);

    const newPriority = await PriorityRepository.create(data);
    if (!newPriority) throw createError("Unable to create priority", 500);
    return newPriority;
  }

  async updateById(id, data) {
    const priority = await PriorityRepository.updateById(id, data);
    if (!priority) throw createError("Unable to update priority", 500);
    return priority;
  }

  async deleteById(id) {
    const priority = await PriorityRepository.deleteById(id);
    if (!priority) throw createError("Unable to delete priority", 500);
    return priority;
  }
}

export default new PriorityService();
