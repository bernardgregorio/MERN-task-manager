import Priority from "../models/Priority.js";
import createError from "http-errors";

class PriorityRepository {
  async findAll() {
    try {
      return await Priority.find();
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findById(id) {
    try {
      return await Priority.findById(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findByName(name) {
    try {
      return await Priority.findOne({ name });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async create(data) {
    try {
      return await Priority.create(data);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async updateById(id, data) {
    try {
      return await Priority.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async deleteById(id) {
    try {
      return await Priority.findByIdAndDelete(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

export default new PriorityRepository();
