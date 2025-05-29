import Task from "../models/Task.js";
import Priority from "../models/Priority.js";
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import { faker } from "@faker-js/faker";
import { data } from "./data/task.js";
import { data as todos } from "./data/todo.js";

export const seedTask = async () => {
  try {
    await Task.deleteMany({});
    let sliceIndex = 0;

    for (let index = 0; index < 30; index++) {
      let priority = await Priority.countDocuments();
      const randomPriority = Math.floor(Math.random() * priority);
      priority = await Priority.findOne().skip(randomPriority);

      let user = await User.countDocuments();
      const randomUser = Math.floor(Math.random() * user);
      user = await User.findOne().skip(randomUser);

      const result = await Task.create({
        title: data[index].title,
        description: data[index].description,
        priority: priority._id,
        assignTo: user._id,
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        createAt: Date.now(),
        createBy: null,
      });

      const todosList = todos.slice(sliceIndex, sliceIndex + 3);
      sliceIndex += 3;
      const todosPerTask = todosList.map((todo) => ({
        title: todo.title,
        description: todo.description,
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        createAt: Date.now(),
        task: result._id,
      }));

      Todo.insertMany(todosPerTask);
    }
  } catch (error) {
    console.log(error);
  }
};
