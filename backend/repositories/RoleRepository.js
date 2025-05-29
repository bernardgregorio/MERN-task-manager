import Role from "../models/Role.js";
import createError from "http-errors";

class RoleRepository {
  async findAll() {
    try {
      return await Role.find();
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findById(id) {
    try {
      return await Role.findById(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findByName(name) {
    try {
      return await Role.findOne({ name });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async create(data) {
    try {
      return await Role.create(data);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async updateById(id, data) {
    try {
      return await Role.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async deleteById(id) {
    try {
      return await Role.findByIdAndDelete(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

export default new RoleRepository();
