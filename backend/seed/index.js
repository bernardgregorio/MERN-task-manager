import db from "../config/db.js";
import { seedRole } from "./roles.js";
import { seedTitle } from "./title.js";
import { seedStatus } from "./status.js";
import { seedPriority } from "./priority.js";
import { seedTodoStatus } from "./todoStatus.js";
import { seedUser } from "./user.js";
import { seedTask } from "./task.js";
import { seedTodo } from "./todo.js";
import { seedAsset } from "./asset.js";
import { seedComment } from "./comment.js";

const seed = async () => {
  await db();
  await seedRole();
  await seedTitle();
  await seedStatus();
  await seedPriority();
  await seedTodoStatus();
  await seedUser();
  await seedTask();
  await seedTodo();
  await seedAsset();
  await seedComment();
  console.log("Seeding completed!");
  process.exit();
};

seed();
