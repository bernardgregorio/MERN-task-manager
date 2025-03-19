import Role from "../models/Role.js";

const list = [
  {
    name: "Admin",
    description:
      "Manages users, roles, system settings, and overall platform security.",
  },
  {
    name: "Developer",
    description:
      "Builds, maintains, and optimizes the system's functionality and features.",
  },
  {
    name: "Designer",
    description:
      "Focuses on UI/UX, creating visually appealing and user-friendly designs.",
  },
  {
    name: "Manager ",
    description:
      "Oversees projects, assigns tasks, and ensures team productivity.",
  },
  {
    name: "Tester/QA",
    description: "Responsible for testing and ensuring the quality of tasks.",
  },
  {
    name: "Support ",
    description: "Handles user issues, bug reports, or customer-related tasks.",
  },
  {
    name: "HR ",
    description:
      "If your task manager extends to administrative or employee tasks.",
  },
  {
    name: "Guest",
    description: "If it's for temporary or external users.",
  },
];

export const seedRole = async () => {
  try {
    await Role.deleteMany({});
    await Role.insertMany(list);
  } catch (error) {
    console.error("Error seeding roles", error);
  }
};
