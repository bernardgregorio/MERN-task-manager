import Title from "../models/Title.js";
import { createError } from "../utils/errorUtils.js";

class TitleRepository {
  async findAll() {
    try {
      return await Title.find();
    } catch (error) {
      throw createError("Failed to fetch titles", 500);
    }
  }

  async findById(id) {
    try {
      return await Title.findById(id);
    } catch (error) {
      throw createError("Failed to fetch title by ID", 500);
    }
  }

  async findByName(name) {
    try {
      return await Title.findOne({ name });
    } catch (error) {
      throw createError("Failed to fetch title by name", 500);
    }
  }

  async create(data) {
    try {
      return await Title.create(data);
    } catch (error) {
      throw createError("Failed to create title", 500);
    }
  }

  async updateById(id, data) {
    try {
      return await Title.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError("Failed to update title", 500);
    }
  }

  async deleteById(id) {
    try {
      return await Title.findByIdAndDelete(id);
    } catch (error) {
      throw createError("Failed to delete title", 500);
    }
  }
}

export default new TitleRepository();
