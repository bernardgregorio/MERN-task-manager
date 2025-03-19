import Task from "../models/Task.js";
import TodoStatus from "../models/TodoStatus.js";
import Priority from "../models/Priority.js";
import { faker } from "@faker-js/faker";

export const seedTask = async () => {
  let tasks = [];

  try {
    await Task.deleteMany({});

    for (let index = 0; index < 30; index++) {
      let todoStatus = await TodoStatus.countDocuments();
      const randomIndex = Math.floor(Math.random() * todoStatus);
      todoStatus = await TodoStatus.findOne().skip(randomIndex);

      let priority = await Priority.countDocuments();
      const randomPriority = Math.floor(Math.random() * priority);
      priority = await Priority.findOne().skip(randomPriority);

      tasks.push({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        priority: priority._id,
        status: todoStatus._id,
        startDate: faker.date.recent(),
        endDate: faker.date.future(),
        createAt: Date.now(),
        createBy: null,
      });
    }

    Task.insertMany(tasks);
  } catch (error) {
    console.log(error);
  }
};
