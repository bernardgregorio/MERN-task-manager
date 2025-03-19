import Tasks from "../models/Task.js";
import Todo from "../models/Todo.js";
import createError from "http-errors";

class DashboardRepository {
  async taskPriorityByPercentage() {
    try {
      const result = await Tasks.aggregate([
        {
          $lookup: {
            from: "priorities",
            localField: "priority",
            foreignField: "_id",
            as: "priorityDetails",
          },
        },
        {
          $unwind: "$priorityDetails",
        },
        {
          $group: {
            _id: "$priorityDetails.name",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            priorities: { $push: { label: "$_id", value: "$count" } },
          },
        },

        {
          $project: {
            _id: 0,
            priorities: 1,
          },
        },
      ]);

      if (!result) throw createError(404, "No data found");

      return result[0];
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async todoByStatusCount() {
    try {
      const result = await Todo.aggregate([
        {
          $lookup: {
            from: "todostatuses",
            localField: "status",
            foreignField: "_id",
            as: "statusDetails",
          },
        },
        {
          $unwind: "$statusDetails",
        },
        {
          $group: {
            _id: "$statusDetails.name",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            statuses: { $push: { status: "$_id", count: "$count" } },
          },
        },
        {
          $unwind: "$statuses",
        },
        {
          $project: {
            _id: 0,
            status: "$statuses.status",
            total: "$statuses.count",
          },
        },
      ]);

      if (!result) throw createError(404, "No data found");
      return result;
    } catch (error) {
      throw createError(500, error.message);
    }
  }

  async taskByStatus() {
    try {
      const counts = await Tasks.aggregate([
        {
          $facet: {
            totalTasks: [{ $count: "count" }],

            completedTasks: [
              {
                $lookup: {
                  from: "todostatuses",
                  localField: "status",
                  foreignField: "_id",
                  as: "status",
                },
              },
              { $unwind: "$status" },
              { $match: { "status.name": "Completed" } },
              { $count: "count" },
            ],

            inProgressTasks: [
              {
                $lookup: {
                  from: "todostatuses",
                  localField: "status",
                  foreignField: "_id",
                  as: "status",
                },
              },
              { $unwind: "$status" },
              { $match: { "status.name": "In Progress" } },
              { $count: "count" },
            ],

            totalTodos: [
              {
                $lookup: {
                  from: "todos",
                  pipeline: [{ $count: "count" }],
                  as: "total",
                },
              },
              { $unwind: { path: "$total", preserveNullAndEmptyArrays: true } },
              { $replaceRoot: { newRoot: "$total" } },
            ],
          },
        },
        {
          $project: {
            totalTasks: { $arrayElemAt: ["$totalTasks.count", 0] },
            completedTasks: { $arrayElemAt: ["$completedTasks.count", 0] },
            inProgressTasks: { $arrayElemAt: ["$inProgressTasks.count", 0] },
            totalTodos: { $arrayElemAt: ["$totalTodos.count", 0] },
            todoByStatus: 1,
          },
        },
      ]);

      if (!counts) throw createError(404, "No data found");
      return counts[0];
    } catch (error) {
      throw createError(500, error.message);
    }
  }
}

export default new DashboardRepository();
