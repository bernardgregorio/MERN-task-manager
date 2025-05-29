import Role from "../models/Role.js";
import { data } from "./data/roles.js";
const list = data;
export const seedRole = async () => {
  try {
    await Role.deleteMany({});
    await Role.insertMany(list);
  } catch (error) {
    console.error("Error seeding roles", error);
  }
};
