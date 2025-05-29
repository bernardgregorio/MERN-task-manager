import CommentRepository from "../repositories/CommentRepository.js";
import { createError } from "../utils/errorUtils.js";

class CommentService {
  async getAll() {
    const comments = await CommentRepository.findAll();
    if (!comments) throw createError("Comment not found", 404);
    return comments;
  }

  async getById(id) {
    const comment = await CommentRepository.findById(id);
    if (!comment) throw createError("Comment not found", 404);
    return comment;
  }

  async create(data) {
    const newComment = await CommentRepository.create(data);
    if (!newComment) throw createError("Unable to create comment", 500);
    return newComment;
  }

  async updateById(id, data) {
    const comment = await CommentRepository.updateById(id, data);
    if (!comment) throw createError("Unable to update comment", 500);
    return comment;
  }

  async deleteById(id) {
    const comment = await CommentRepository.deleteById(id);
    if (!comment) throw createError("Unable to delete comment", 500);
    return comment;
  }
}

export default new CommentService();
