import TodoStatus from "../models/TodoStatus.js";
import { createError } from "../utils/errorUtils.js";

class TodoStatusRepository {
  async findAll() {
    try {
      return await TodoStatus.find();
    } catch (error) {
      throw createError("Failed to fetch todo statuses", 500);
    }
  }

  async findById(id) {
    try {
      return await TodoStatus.findById(id);
    } catch (error) {
      throw createError("Failed to fetch todo status by ID", 500);
    }
  }

  async findByNames(name) {
    try {
      return await TodoStatus.findOne({ name });
    } catch (error) {
      throw createError("Failed to fetch todo status by name", 500);
    }
  }

  async create(data) {
    try {
      return await TodoStatus.create(data);
    } catch (error) {
      throw createError("Failed to create todo status", 500);
    }
  }

  async updateById(id, data) {
    try {
      return await TodoStatus.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError("Failed to update todo status", 500);
    }
  }

  async deleteById(id) {
    try {
      return await TodoStatus.findByIdAndDelete(id);
    } catch (error) {
      throw createError("Failed to delete todo status", 500);
    }
  }
}

export default new TodoStatusRepository();
