import User from "../models/User.js";
import Role from "../models/Role.js";
import Status from "../models/Status.js";
import Title from "../models/Title.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const seedUser = async () => {
  let users = [];
  try {
    await User.deleteMany({});
    for (let i = 0; i < 30; i++) {
      /**get role */
      let getRole = await Role.countDocuments();
      const randomRoleIndex = Math.floor(Math.random() * getRole);
      getRole = await Role.findOne().skip(randomRoleIndex);

      /** get title */
      let getTitle = await Title.countDocuments();
      const randomTitleIndex = Math.floor(Math.random() * getTitle);
      getTitle = await Title.findOne().skip(randomTitleIndex);

      /** get status */
      const status = await Status.findOne().sort({ _id: 1 });

      /** hash password */
      const hashedPassword = await bcrypt.hash("admin", 10);

      users.push({
        fullname: faker.person.firstName() + " " + faker.person.lastName(),
        username: faker.internet.username(),
        password: hashedPassword,
        email: faker.internet.email(),
        title: getTitle._id,
        role: getRole._id,
        status: status._id,
        refreshToken: null,
        googleId: null,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createAt: Date.now(),
        createBy: null,
      });
    }
    const test = await User.insertMany(users);
    console.log("User seed success");
  } catch (error) {
    console.log(error);
  }
};
