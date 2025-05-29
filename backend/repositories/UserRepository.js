import User from "../models/User.js";
import { createError } from "../utils/errorUtils.js";
import { logger } from "../utils/loggerUtils.js";

class UserRepository {
  async findAll(page = 1, limit = 10, search = "") {
    try {
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      const skip = (page - 1) * limit;

      const matchQuery = search
        ? {
            $or: [
              { statusName: { $regex: search, $options: "i" } },
              { titleName: { $regex: search, $options: "i" } },
              { roleName: { $regex: search, $options: "i" } },
              { fullname: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const users = await User.aggregate([
        {
          $lookup: {
            from: "status",
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
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "roleInfo",
          },
        },
        {
          $addFields: {
            roleName: { $arrayElemAt: ["$roleInfo.name", 0] },
          },
        },
        {
          $lookup: {
            from: "titles",
            localField: "title",
            foreignField: "_id",
            as: "titleInfo",
          },
        },
        {
          $addFields: {
            titleName: {
              $ifNull: [{ $arrayElemAt: ["$titleInfo.name", 0] }, "No Title"],
            },
          },
        },
        {
          $project: {
            fullname: 1,
            username: 1,
            email: 1,
            title: 1,
            titleName: 1,
            role: 1,
            roleName: 1,
            status: 1,
            statusName: 1,
            expirationDate: 1,
          },
        },
        { $match: matchQuery },
        {
          $facet: {
            users: [{ $skip: skip }, { $limit: limit }],
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
            data: "$users",
            totalPages: 1,
            currentPage: 1,
            totalDocuments: 1,
          },
        },
      ]);

      return users[0];
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch users", 500);
    }
  }

  async getAllUsers() {
    try {
      return await User.find().populate("roles").populate("title").exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch all users", 500);
    }
  }

  async findUserByUsername(username) {
    try {
      return await User.findOne({ username }).populate("status").exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch user by username", 500);
    }
  }

  async findUserByEmail(email) {
    try {
      return await User.findOne({ email }).populate("status").exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch user by email", 500);
    }
  }

  async createUser(data) {
    try {
      return await User.create(data);
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to create user", 500);
    }
  }

  async findUserById(id) {
    try {
      return await User.findById(id).populate("status").exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch user by ID", 500);
    }
  }

  async updateUser(id, data) {
    try {
      return await User.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to update user", 500);
    }
  }

  async deleteUser(id) {
    try {
      return await User.findOneAndDelete({ _id: id }).exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to delete user", 500);
    }
  }

  async saveRefreshToken(id, token) {
    try {
      return await User.findByIdAndUpdate(
        id,
        { refreshToken: token },
        { new: true }
      ).exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to save refresh token", 500);
    }
  }

  async findUserByRefreshToken(token) {
    try {
      return await User.findOne({ refreshToken: token }).exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch user by refresh token", 500);
    }
  }

  async findUserByGoogleId(id) {
    try {
      return await User.findOne({ googleId: id });
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to fetch user by Google ID", 500);
    }
  }

  async saveRefreshTokenByGoogleId(googleId, token) {
    try {
      return await User.findOneAndUpdate(
        { googleId },
        { refreshToken: token },
        { new: true }
      ).exec();
    } catch (error) {
      logger.error(error.message);
      throw createError("Failed to save refresh token by Google ID", 500);
    }
  }
}

export default new UserRepository();
