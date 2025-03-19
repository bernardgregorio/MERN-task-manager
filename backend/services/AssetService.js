import AssetRepository from "../repositories/AssetRepository.js";
import { createError } from "../utils/errorUtils.js";

class AssetService {
  async getAll() {
    const assets = await AssetRepository.findAll();
    if (!assets) throw createError("Assets not found", 404);
    return assets;
  }

  async getById(id) {
    const asset = await AssetRepository.findById(id);
    if (!asset) throw createError("Asset not found", 404);
    return asset;
  }

  async create(data) {
    const newAsset = await AssetRepository.create(data);
    if (!newAsset) throw createError("Unable to create asset", 500);
    return newAsset;
  }

  async updateById(id, data) {
    const asset = await AssetRepository.updateById(id, data);
    if (!asset) throw createError("Unable to update asset", 500);
    return asset;
  }

  async deleteById(id) {
    const asset = await AssetRepository.deleteById(id);
    if (!asset) throw createError("Unable to delete asset", 500);
    return asset;
  }
}

export default new AssetService();
