import Asset from "../models/Asset.js";
import createError from "http-errors";

class AssetRepository {
  async findAll() {
    try {
      return await Asset.find();
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async findById(id) {
    try {
      return await Asset.findById(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async create(data) {
    try {
      return await Asset.create(data);
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async updateById(id, data) {
    try {
      return await Asset.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async deleteById(id) {
    try {
      return await Asset.findByIdAndDelete(id);
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

export default new AssetRepository();
