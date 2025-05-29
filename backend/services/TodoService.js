import TodoRepository from "../repositories/TodoRepository.js";
import { createError } from "../utils/errorUtils.js";

class TodoService {
  async getAll(page, limit, search) {
    const todos = await TodoRepository.findAll(page, limit, search);
    if (!todos) throw createError("Todos not found", 404);
    return todos;
  }

  async getById(id) {
    const todo = await TodoRepository.findById(id);
    if (!todo) throw createError("Todo not found", 404);
    return todo;
  }

  async create(data) {
    const todo = await TodoRepository.create(data);
    if (!todo) throw createError("Unable to create todo", 500);

    return todo;
  }

  async updateById(id, data) {
    const todo = await TodoRepository.updateById(id, data);
    if (!todo) throw createError("Unable to update todo", 500);
    return todo;
  }

  async deleteById(id) {
    const todo = await TodoRepository.deleteById(id);
    if (!todo) throw createError("Unable to delete todo", 500);
    return todo;
  }
}

export default new TodoService();
