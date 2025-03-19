import Todo from "../models/Todo.js";
import TodoStatus from "../models/TodoStatus.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import { faker } from "@faker-js/faker";

export const seedTodo = async () => {
  let todos = [];
  try {
    await Todo.deleteMany({});
    for (let index = 0; index < 30; index++) {
      let todoStatus = await TodoStatus.countDocuments();
      const randomIndex = Math.floor(Math.random() * todoStatus);
      todoStatus = await TodoStatus.findOne().skip(randomIndex);

      let userCount = await User.countDocuments();
      const randomUserIndex = Math.floor(Math.random() * userCount);
      const user = await User.findOne().skip(randomUserIndex);

      let countTask = await Task.countDocuments();
      const randomTaskIndex = Math.floor(Math.random() * countTask);
      const task = await Task.findOne().skip(randomTaskIndex);

      todos.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        status: todoStatus._id,
        assignTo: user ? user._id : null,
        task: task ? task._id : null,
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        createAt: Date.now(),
        createBy: null,
      });
    }

    Todo.insertMany(todos);
  } catch (error) {
    console.log(error);
  }
};
