import TodoStatus from "../models/TodoStatus.js";

const list = [
  {
    name: "To-Do",
    description: "Task is created but not started yet.",
  },
  {
    name: "In Progress",
    description: "Task is actively being worked on.",
  },
  {
    name: "Testing",
    description: "Task is being tested for quality assurance.",
  },
  {
    name: "Completed",
    description: "Task is finished successfully.",
  },
  {
    name: "On Hold",
    description: "Task is temporarily paused.",
  },
  {
    name: "Pending",
    description: "Task is awaiting approval or further action.",
  },
  {
    name: "Canceled",
    description: "Task is no longer needed and has been stopped.",
  },
  {
    name: "Declined",
    description: "Task was reviewed but not approved.",
  },
  {
    name: "Invalid",
    description: "Task was created by mistake or is no longer relevant.",
  },
  {
    name: "Revision",
    description: "Task requires modifications before completion.",
  },
];

export const seedTodoStatus = async () => {
  try {
    await TodoStatus.deleteMany({});
    await TodoStatus.insertMany(list);
  } catch (error) {
    console.error("Error seeding todo status", error);
  }
};
