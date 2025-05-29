import Status from "../models/Status.js";

class StatusRepository {
  async findAll() {
    return await Status.find().exec();
  }

  async findById(id) {
    return await Status.findById(id).exec();
  }

  async findByName(name) {
    return await Status.findOne({ name }).exec();
  }

  async create(data) {
    return await Status.create(data);
  }

  async updateById(id, data) {
    return await Status.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id) {
    return await Status.findByIdAndDelete(id).exec();
  }
}

export default new StatusRepository();
