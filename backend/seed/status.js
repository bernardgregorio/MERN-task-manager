import Status from "../models/Status.js";

const list = [
  {
    name: "Active",
    description: "Fully functional user account and has access to all features",
  },
  {
    name: "Inactive",
    description:
      "Account exists but is temporarily restricted or awaiting activation.",
  },
  {
    name: "Disabled",
    description:
      "User account is permanently restricted and cannot be used unless reactivated by an admin.",
  },
];

export const seedStatus = async () => {
  try {
    await Status.deleteMany({});
    await Status.insertMany(list);
  } catch (error) {
    console.error("Error seeding status", error);
  }
};
