import Asset from "../models/Asset.js";
import Task from "../models/Task.js";
import { faker } from "@faker-js/faker";

export const seedAsset = async () => {
  let assets = [];
  try {
    await Asset.deleteMany({});

    for (let i = 0; i < 10; i++) {
      let task = await Task.countDocuments();
      let randomIndex = Math.floor(Math.random() * task);
      task = await Task.findOne().skip(randomIndex);

      assets.push({
        name: faker.lorem.sentence(),
        value: faker.finance.amount(),
        task: task._id,
        createAt: Date.now(),
        createBy: null,
      });
    }

    Asset.insertMany(assets);
  } catch (error) {
    console.log(error);
  }
};
