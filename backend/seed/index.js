import db from "../config/db.js";
import { seedRole } from "./roles.js";
import { seedTitle } from "./title.js";
import { seedStatus } from "./status.js";
import { seedPriority } from "./priority.js";
import { seedUser } from "./user.js";
import { seedTask } from "./task.js";

const seed = async () => {
  await db();
  await seedRole();
  await seedTitle();
  await seedStatus();
  await seedPriority();
  await seedUser();
  await seedTask();

  console.log("Seeding completed!");
  process.exit();
};

seed();
