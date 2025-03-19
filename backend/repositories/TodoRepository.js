import Todo from "../models/Todo.js";
import { createError } from "../utils/errorUtils.js";

class TodoRepository {
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
              { statusName: { $regex: search, $options: "i" } },
              { "assignTo.fullname": { $regex: search, $options: "i" } },
              { taskName: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const todos = await Todo.aggregate([
        {
          $lookup: {
            from: "todostatuses",
            localField: "status",
            foreignField: "_id",
            as: "todoStatus",
          },
        },
        {
          $addFields: {
            statusName: { $arrayElemAt: ["$todoStatus.name", 0] },
          },
        },
        {
          $lookup: {
            from: "tasks",
            localField: "task",
            foreignField: "_id",
            as: "taskInfo",
          },
        },
        {
          $lookup: {
            from: "priorities",
            localField: "taskInfo.priority",
            foreignField: "_id",
            as: "priorityInfo",
          },
        },
        {
          $addFields: {
            taskName: {
              $ifNull: [{ $arrayElemAt: ["$taskInfo.title", 0] }, "N/A"],
            },
            priority: {
              $ifNull: [{ $arrayElemAt: ["$priorityInfo.name", 0] }, "N/A"],
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "assignTo",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "userInfo.status",
            foreignField: "_id",
            as: "statusInfo",
          },
        },
        {
          $lookup: {
            from: "titles",
            localField: "userInfo.title",
            foreignField: "_id",
            as: "titleInfo",
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "userInfo.role",
            foreignField: "_id",
            as: "roleInfo",
          },
        },
        {
          $addFields: {
            assignTo: {
              $cond: {
                if: { $eq: ["$userInfo", []] },
                then: [],
                else: {
                  _id: {
                    $ifNull: [{ $arrayElemAt: ["$userInfo._id", 0] }, null],
                  },
                  fullname: {
                    $ifNull: [
                      { $arrayElemAt: ["$userInfo.fullname", 0] },
                      "N/A",
                    ],
                  },
                  username: {
                    $ifNull: [
                      { $arrayElemAt: ["$userInfo.username", 0] },
                      "N/A",
                    ],
                  },
                  email: {
                    $ifNull: [{ $arrayElemAt: ["$userInfo.email", 0] }, "N/A"],
                  },
                  role: {
                    $ifNull: [{ $arrayElemAt: ["$roleInfo.name", 0] }, "N/A"],
                  },
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
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            assignTo: 1,
            task: 1,
            status: 1,
            startDate: 1,
            endDate: 1,
            statusName: 1,
            taskName: 1,
            priority: 1,
            assignTo: 1,
          },
        },
        { $match: matchQuery },
        {
          $facet: {
            todos: [{ $skip: skip }, { $limit: limit }],
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
            data: "$todos",
            totalPages: 1,
            currentPage: 1,
            totalDocuments: 1,
          },
        },
      ]);

      if (!todos) throw createError("Todos not found", 404);

      return todos[0];
    } catch (error) {
      throw createError("Unable to fetch todos", 500);
    }
  }

  async findById(id) {
    try {
      const todo = await Todo.findById(id);
      if (!todo) throw createError("Todo not found", 404);
      return todo;
    } catch (error) {
      throw createError("Unable to fetch todo", 500);
    }
  }

  async create(data) {
    try {
      return await Todo.create(data);
    } catch (error) {
      throw createError("Unable to create todo", 500);
    }
  }

  async updateById(id, data) {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, data, {
        new: true,
      }).exec();
      if (!updatedTodo) throw createError("Todo not found", 404);
      return updatedTodo;
    } catch (error) {
      throw createError("Unable to update todo", 500);
    }
  }

  async deleteById(id) {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(id);
      if (!deletedTodo) throw createError("Todo not found", 404);
      return deletedTodo;
    } catch (error) {
      throw createError("Unable to delete todo", 500);
    }
  }
}

export default new TodoRepository();
