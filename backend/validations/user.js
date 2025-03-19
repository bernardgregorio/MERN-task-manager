const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const fullname = {
  in: ["body"],
  isString: {
    errorMessage: "Name must be a string",
  },
  isLength: {
    options: { min: 4, max: 20 },
    errorMessage: "Name must be between 4 and 20 characters",
  },
};

const username = {
  in: ["body"],
  isString: {
    errorMessage: "Name must be a string",
  },
  isLength: {
    options: { min: 4, max: 15 },
    errorMessage: "Name must be between 4 and 15 characters",
  },
  matches: {
    options: USERNAME_REGEX,
    errorMessage:
      "Invalid username. Must start with a letter and be 3-15 characters long. " +
      "Can contain letters, numbers, hyphens, and underscores.",
  },
};

const password = {
  in: ["body"],
  isString: {
    errorMessage: "Password must be a string",
  },
  isLength: {
    options: { min: 8, max: 24 },
    errorMessage: "Password must be between 4 and 15 characters",
  },
  matches: {
    options: PASSWORD_REGEX,
    errorMessage:
      "Password must be between 8 and 24 characters. Must contain at " +
      "least one uppercase letter, one lowercase letter, one digit, and " +
      "one special character: ! @ # $ %.",
  },
};

const email = {
  in: ["body"],
  isEmail: {
    errorMessage: "Email must be a valid email",
  },
};

const status = {
  in: ["body"],
  isString: {
    errorMessage: "Status must be a string",
  },
};

const role = {
  in: ["body"],
  isString: {
    errorMessage: "Role must be a string",
  },
};

const title = {
  in: ["body"],
  isString: {
    errorMessage: "Title must be a string",
  },
};

/** create user, all field is required */
const createUserSchema = {
  fullname: {
    ...fullname,
    notEmpty: {
      errorMessage: "fullname cannot be empty",
    },
  },
  username: {
    ...username,
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
  password: {
    ...password,
    notEmpty: {
      errorMessage: "Password cannot be empty",
    },
  },
  email: {
    ...email,
    notEmpty: {
      errorMessage: "Email cannot be empty",
    },
  },
  title: {
    ...title,
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },
  },
  status: {
    ...status,
    notEmpty: {
      errorMessage: "Status cannot be empty",
    },
  },
  role: {
    ...role,
    notEmpty: {
      errorMessage: "Role cannot be empty",
    },
  },
};

/** update per field */
const updateUserSchema = {
  fullname: {
    ...fullname,
    optional: true,
  },
  username: {
    ...username,
    optional: true,
  },
  password: {
    ...password,
    optional: true,
  },
  email: {
    ...email,
    optional: true,
  },
  title: {
    ...title,
    optional: true,
  },
  role: {
    ...role,
    optional: true,
  },
  status: {
    ...status,
    optional: true,
  },
  expirationDate: {
    in: ["body"],
    optional: true,
    isDate: true,
    errorMessage: "Expiration date should be a date",
    custom: {
      options: (value) => {
        const currentDate = new Date();
        const inputDate = new Date(value);
        return inputDate >= currentDate;
      },
      errorMessage: "Expiration date must be a current or future date",
    },
  },
};

export { createUserSchema, updateUserSchema };
