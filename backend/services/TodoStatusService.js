import TodoStatusRepository from "../repositories/TodoStatusRepository.js";
import { createError } from "../utils/errorUtils.js";

class TodoStatusService {
  async getAll() {
    const todoStatuses = await TodoStatusRepository.findAll();
    if (!todoStatuses) throw createError("Todo statuses not found", 404);
    return todoStatuses;
  }

  async getById(id) {
    const todoStatus = await TodoStatusRepository.findById(id);
    if (!todoStatus) throw createError("Todo status not found", 404);
    return todoStatus;
  }

  async create(data) {
    const todoStatus = await TodoStatusRepository.findByName(data.name);
    if (todoStatus) throw createError("Todo status already exists", 400);

    const newTodoStatus = await TodoStatusRepository.create(data);
    if (!newTodoStatus) throw createError("Unable to create todo status", 500);

    return newTodoStatus;
  }

  async updateById(id, data) {
    const todoStatus = await TodoStatusRepository.updateById(id, data);
    if (!todoStatus) throw createError("Unable to update todo status", 500);
    return todoStatus;
  }

  async deleteById(id) {
    const todoStatus = await TodoStatusRepository.deleteById(id);
    if (!todoStatus) throw createError("Unable to delete todo status", 500);
    return todoStatus;
  }
}

export default new TodoStatusService();
