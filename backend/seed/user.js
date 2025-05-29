import User from "../models/User.js";
import Role from "../models/Role.js";

import Title from "../models/Title.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUser = async () => {
  let users = [];
  try {
    let allRoles;
    let getTitle;
    let hashedPassword;

    // Fetch all roles once to avoid repeated database queries
    allRoles = await Role.find({}).select("_id");

    await User.deleteMany({});
    for (let i = 0; i < 30; i++) {
      const randomRoleCount = Math.floor(Math.random() * 2) + 1;
      const randomRoles = allRoles
        .sort(() => 0.5 - Math.random())
        .slice(0, randomRoleCount)
        .map((role) => role._id);

      /** get title */
      getTitle = await Title.countDocuments();
      const randomTitleIndex = Math.floor(Math.random() * getTitle);
      getTitle = await Title.findOne().skip(randomTitleIndex);

      /** hash password */
      hashedPassword = await bcrypt.hash("admin", 10);

      users.push({
        fullname: faker.person.firstName() + " " + faker.person.lastName(),
        username: faker.internet.username(),
        password: hashedPassword,
        email: faker.internet.email(),
        title: getTitle._id,
        roles: randomRoles,
        refreshToken: null,
        googleId: null,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createAt: Date.now(),
        createBy: null,
      });
    }

    /** create admin user */
    users.push({
      fullname: "Bernard Gregorio",
      username: "admin",
      password: hashedPassword,
      email: faker.internet.email(),
      title: getTitle._id,
      roles: allRoles[0]._id,
      refreshToken: null,
      googleId: null,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createAt: Date.now(),
      createBy: null,
    });

    await User.insertMany(users);
    console.log("User seed success");
  } catch (error) {
    console.log(error);
  }
};
