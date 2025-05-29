import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import Task from "../models/Task.js";
import { faker } from "@faker-js/faker";

export const seedComment = async () => {
  let comments = [];

  try {
    await Comment.deleteMany({});
    for (let i = 0; i < 10; i++) {
      let user = await User.countDocuments();
      let randomUserIndex = Math.floor(Math.random() * user);
      user = await User.findOne().skip(randomUserIndex);

      let task = await Task.countDocuments();
      let randomIndex = Math.floor(Math.random() * task);
      task = await Task.findOne().skip(randomIndex);

      comments.push({
        comment: faker.lorem.sentence(),
        user: user._id,
        fromModel: "Task",
        from: task._id,
        createAt: Date.now(),
        createBy: null,
      });
    }

    for (let i = 0; i < 10; i++) {
      let user = await User.countDocuments();
      let randomUserIndex = Math.floor(Math.random() * user);
      user = await User.findOne().skip(randomUserIndex);

      let todo = await Todo.countDocuments();
      let randomIndex = Math.floor(Math.random() * todo);
      todo = await Todo.findOne().skip(randomIndex);

      comments.push({
        comment: faker.lorem.sentence(),
        user: user._id,
        fromModel: "Todo",
        from: todo._id,
        createAt: Date.now(),
        createBy: null,
      });
    }

    Comment.insertMany(comments);
  } catch (error) {
    console.log(error);
  }
};
