import Task from "../models/Task.js";
import { createError } from "../utils/errorUtils.js";

class TaskRepository {
  async findAll(page = 1, limit = 10, search = "") {
    try {
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      const skip = (page - 1) * limit;

      const matchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
              { status: { $regex: search, $options: "i" } },
              { "userDetails.fullname": { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const tasks = await Task.aggregate([
        // Lookup Priority
        {
          $lookup: {
            from: "priorities",
            localField: "priority",
            foreignField: "_id",
            as: "priorityInfo",
          },
        },
        {
          $addFields: {
            priorityName: { $arrayElemAt: ["$priorityInfo.name", 0] },
          },
        },

        // Lookup Status
        {
          $lookup: {
            from: "todostatuses",
            localField: "status",
            foreignField: "_id",
            as: "statusInfo",
          },
        },
        {
          $addFields: {
            statusName: { $arrayElemAt: ["$statusInfo.name", 0] },
          },
        },

        // Lookup Todos
        {
          $lookup: {
            from: "todos",
            localField: "_id",
            foreignField: "task",
            as: "todos",
          },
        },

        // Lookup Assigned Users
        {
          $lookup: {
            from: "users",
            localField: "todos.assignTo",
            foreignField: "_id",
            as: "userDetails",
          },
        },

        // Lookup Titles for Users
        {
          $lookup: {
            from: "titles",
            localField: "userDetails.title",
            foreignField: "_id",
            as: "titleInfo",
          },
        },

        // Lookup Status for Users
        {
          $lookup: {
            from: "status",
            localField: "userDetails.status",
            foreignField: "_id",
            as: "statusInfo",
          },
        },

        {
          $addFields: {
            userDetails: {
              $map: {
                input: "$userDetails",
                as: "user",
                in: {
                  _id: "$$user._id",
                  fullname: "$$user.fullname",
                  username: "$$user.username",
                  email: "$$user.email",
                  role: "$$user.role",
                  status: {
                    $ifNull: [{ $arrayElemAt: ["$statusInfo.name", 0] }, "N/A"],
                  },
                  title: {
                    $ifNull: [{ $arrayElemAt: ["$titleInfo.name", 0] }, "N/A"],
                  },
                },
              },
            },
          },
        },

        // Count Todos and Users
        {
          $addFields: {
            todoCount: { $size: "$todos" },
            userCount: {
              $size: { $ifNull: [{ $setUnion: "$todos.assignTo" }, []] },
            },
            assignedUsers: "$userDetails",
          },
        },

        // Clean Up Fields
        {
          $project: {
            priorityInfo: 0,
            statusInfo: 0,
            tasks: 0,
            titleInfo: 0,
          },
        },
        { $match: matchQuery },
        {
          $facet: {
            tasks: [{ $skip: skip }, { $limit: limit }],
            totalCount: [{ $count: "total" }],
          },
        },

        {
          $addFields: {
            totalDocuments: {
              $ifNull: [{ $arrayElemAt: ["$totalCount.total", 0] }, 0],
            },
            totalPages: {
              $ceil: {
                $divide: [
                  { $ifNull: [{ $arrayElemAt: ["$totalCount.total", 0] }, 0] },
                  limit,
                ],
              },
            },
            currentPage: page,
          },
        },

        {
          $project: {
            data: "$tasks",
            totalPages: 1,
            currentPage: 1,
            totalDocuments: 1,
          },
        },
      ]);

      return tasks[0];
    } catch (error) {
      throw createError("Failed to fetch tasks", 500);
    }
  }

  async getAllTaskByStatus() {
    try {
      const tasks = await Task.aggregate([
        {
          $lookup: {
            from: "todostatuses",
            localField: "status",
            foreignField: "_id",
            as: "statusInfo",
          },
        },
        {
          $match: {
            "statusInfo.name": { $nin: ["Completed", "Declined", "Canceled"] },
          },
        },
        {
          $lookup: {
            from: "priorities",
            localField: "priority",
            foreignField: "_id",
            as: "priorityInfo",
          },
        },
        {
          $addFields: {
            status: { $arrayElemAt: ["$statusInfo.name", 0] },
            priority: { $arrayElemAt: ["$priorityInfo.name", 0] },
          },
        },
        {
          $project: {
            title: 1,
            description: 1,
            status: 1,
            priority: 1,
            startDate: 1,
            endDate: 1,
            createdAt: 1,
          },
        },
      ]);

      return tasks;
    } catch (error) {
      throw createError("Failed to fetch tasks by status", 500);
    }
  }

  async getById(id) {
    try {
      return await Task.findById(id);
    } catch (error) {
      throw createError("Failed to fetch task by ID", 500);
    }
  }

  async create(data) {
    try {
      return await Task.create(data);
    } catch (error) {
      throw createError("Failed to create task", 500);
    }
  }

  async updateById(id, data) {
    try {
      return await Task.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw createError("Failed to update task", 500);
    }
  }

  async deleteById(id) {
    try {
      return await Task.findOneAndDelete({ _id: id }).exec();
    } catch (error) {
      throw createError("Failed to delete task", 500);
    }
  }
}

export default new TaskRepository();
