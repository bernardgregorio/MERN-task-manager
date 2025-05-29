import Task from "../models/Task.js";
import { createError } from "../utils/errorUtils.js";
import { logger } from "../utils/loggerUtils.js";

class TaskRepository {
  async findAll(page = 1, limit = 10, search = "") {
    try {
      // Ensure page and limit are integers
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);

      const matchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { "priority.name": { $regex: search, $options: "i" } },
              { "status.name": { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const skip = (page - 1) * limit;

      const tasks = await Task.aggregate([
        {
          $lookup: {
            from: "priorities",
            localField: "priority",
            foreignField: "_id",
            as: "priority",
          },
        },
        { $unwind: "$priority" },
        {
          $lookup: {
            from: "status",
            localField: "status",
            foreignField: "_id",
            as: "status",
          },
        },
        { $unwind: "$status" },
        {
          $lookup: {
            from: "users",
            localField: "assignTo",
            foreignField: "_id",
            as: "assignToUser",
          },
        },
        { $unwind: "$assignToUser" },
        { $match: matchQuery },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [
              {
                $project: {
                  _id: 1,
                  title: 1,
                  description: 1,
                  startDate: 1,
                  endDate: 1,
                  createAt: 1,
                  priorityName: "$priority",
                  statusName: "$status",
                  assignToName: "$assignToUser",
                },
              },
              { $skip: skip },
              { $limit: limit },
            ],
          },
        },
      ]);

      const total = tasks[0]?.metadata[0]?.total || 0;
      const totalPages = Math.ceil(total / limit) || 1;

      return {
        tasks: tasks[0]?.data || [],
        totalRows: total,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch tasks", 500);
    }
  }

  async findById(id) {
    try {
      return await Task.findById(id);
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch task by ID", 500);
    }
  }

  async findByStatus(status) {
    try {
      return await Task.find({ status });
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch tasks by status", 500);
    }
  }

  async create(data) {
    try {
      return await Task.create(data);
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to create task", 500);
    }
  }

  async updateById(id, data) {
    try {
      return await Task.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to update task", 500);
    }
  }

  async deleteById(id) {
    try {
      return await Task.findByIdAndDelete(id);
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to delete task", 500);
    }
  }
}

export default new TaskRepository();
