import Comment from "../models/Comment.js";
import createError from "http-errors";

class CommentRepository {
  async findAll() {
    try {
      return await Comment.find();
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findById(id) {
    try {
      return await Comment.findById(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async create(data) {
    try {
      return await Comment.create(data);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async updateById(id, data) {
    try {
      return await Comment.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async deleteById(id) {
    try {
      return await Comment.findByIdAndDelete(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

export default new CommentRepository();
