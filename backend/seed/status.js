import Status from "../models/Status.js";
import { data } from "./data/status.js";
const list = data;
export const seedStatus = async () => {
  try {
    await Status.deleteMany({});
    await Status.insertMany(list);
  } catch (error) {
    console.error("Error seeding todo status", error);
  }
};
