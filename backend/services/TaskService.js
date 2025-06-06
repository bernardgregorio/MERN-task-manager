import TaskRepository from "../repositories/TaskRepository.js";
import { createError } from "../utils/errorUtils.js";

class TaskService {
  async findAll(page, limit, search) {
    const tasks = await TaskRepository.findAll(page, limit, search);
    if (!tasks) throw createError("Tasks not found", 404);
    return tasks;
  }

  async findById(id) {
    const task = await TaskRepository.findById(id);
    if (!task) throw createError("Task not found", 404);
    return task;
  }

  async create(data) {
    const task = await TaskRepository.create(data);
    if (!task) throw createError("Unable to create task", 500);
    return task;
  }

  async updateById(id, data) {
    const task = await TaskRepository.updateById(id, data);
    if (!task) throw createError("Unable to update task", 500);
    return task;
  }

  async deleteById(id) {
    const task = await TaskRepository.deleteById(id);
    if (!task) throw createError("Unable to delete task", 500);
    return task;
  }
}

export default new TaskService();
