import Title from "../models/Title.js";
import { data } from "./data/title.js";
const list = data;
export const seedTitle = async () => {
  try {
    await Title.deleteMany({});
    await Title.insertMany(list);
  } catch (error) {
    console.error("Error seeding title", error);
  }
};
