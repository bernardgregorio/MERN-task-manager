import Priority from "../models/Priority.js";
import { data } from "./data/priorities.js";
const list = data;
export const seedPriority = async () => {
  try {
    await Priority.deleteMany({});
    await Priority.insertMany(list);
  } catch (error) {
    console.error("Error seeding priority", error);
  }
};
