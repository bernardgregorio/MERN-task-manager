import Title from "../models/Title.js";

const list = [
  {
    name: "Administrator",
    description:
      "System operations, full access to configure settings, monitor activity, and enforce policies.",
  },
  {
    name: "Full Stack Developer",
    description: "Handles both frontend and backend.",
  },
  {
    name: "Frontend Developer",
    description: " Specializes in UI and client-side coding.",
  },
  {
    name: "Backend Developer",
    description: "Focuses on server-side logic and databases.",
  },
  {
    name: "UX Designer",
    description: "Focuses on user interface design.",
  },
  {
    name: "Product Manager",
    description: "Defines product vision, roadmap, and feature priorities.",
  },
  {
    name: "Data Analyst",
    description: "Bridges the gap between business needs and technology.",
  },
  {
    name: "Recruiter",
    description: "Handles hiring processes and talent acquisition.",
  },
  {
    name: "QA Engineer",
    description: "Ensures quality by testing software.",
  },
];

export const seedTitle = async () => {
  try {
    await Title.deleteMany({});
    await Title.insertMany(list);
  } catch (error) {
    console.error("Error seeding title", error);
  }
};
