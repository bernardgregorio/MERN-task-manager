import TitleRepository from "../repositories/TitleRepository.js";
import { createError } from "../utils/errorUtils.js";

class TitleService {
  async getAll() {
    const titles = await TitleRepository.findAll();
    if (!titles) throw createError("Titles not found", 404);
    return titles;
  }

  async getById(id) {
    const title = await TitleRepository.findById(id);
    if (!title) throw createError("Title not found", 404);
    return title;
  }

  async create(data) {
    const title = await TitleRepository.findByName(data.name);
    if (title) throw createError("Title already exists", 400);

    const newTitle = await TitleRepository.create(data);
    if (!newTitle) throw createError("Unable to create title", 500);

    return newTitle;
  }

  async updateById(id, data) {
    const title = await TitleRepository.updateById(id, data);
    if (!title) throw createError("Unable to update title", 500);
    return title;
  }

  async deleteById(id) {
    const title = await TitleRepository.deleteById(id);
    if (!title) throw createError("Unable to delete title", 500);
    return title;
  }
}

export default new TitleService();
