const title = {
  in: ["body"],
  isString: {
    errorMessage: "Title must be a string.",
  },
  isLength: {
    errorMessage: "Title must be between 3 and 100 characters.",
    options: { min: 3, max: 100 },
  },
};

const description = {
  in: ["body"],
  isString: {
    errorMessage: "Description must be a string.",
  },
  isLength: {
    errorMessage: "Description must be between 3 and 200 characters.",
    options: { min: 3, max: 200 },
  },
};

const todoStatus = {
  in: ["body"],
  isString: {
    errorMessage: "Please select status.",
  },
  custom: {
    options: (value) => {
      if (value === 0 || value === "0") {
        throw new Error("Please select a status.");
      }
      return true;
    },
  },
};

const assignTo = {
  in: ["body"],
  isString: {
    errorMessage: "Please select assign to.",
  },
  custom: {
    options: (value) => {
      if (value === 0 || value === "0") {
        throw new Error("Please select a assign to.");
      }
      return true;
    },
  },
};

const task = {
  in: ["body"],
  isString: {
    errorMessage: "Please select a task.",
  },
};

const startDate = {
  in: ["body"],
  isDate: {
    errorMessage: "Start date must be a date.",
  },
};

const endDate = {
  in: ["body"],
  isDate: {
    errorMessage: "End date must be a date.",
  },
  custom: {
    options: (value, { req }) => {
      if (new Date(value) < new Date(req.body.startDate)) {
        throw new Error("End date cannot be before start date.");
      }
      return true;
    },
  },
};

export const createTodo = {
  title: {
    ...title,
    notEmpty: {
      errorMessage: "Title is required.",
    },
  },
  description: {
    ...description,
    notEmpty: {
      errorMessage: "Description is required.",
    },
  },
  status: {
    ...todoStatus,
    notEmpty: {
      errorMessage: "Status is required.",
    },
  },

  assignTo: {
    ...assignTo,
    notEmpty: {
      errorMessage: "Assign to is required.",
    },
  },
  task: {
    ...task,
    notEmpty: {
      errorMessage: "Task is required.",
    },
  },
  startDate: {
    ...startDate,
    notEmpty: {
      errorMessage: "Start date is required.",
    },
  },
  endDate: {
    ...endDate,
    notEmpty: {
      errorMessage: "End date is required.",
    },
  },
};

export const updateTodo = {
  title: {
    ...title,
    optional: true,
  },
  description: {
    ...description,
    optional: true,
  },
  status: {
    ...todoStatus,
    optional: true,
  },
  assignTo: {
    ...assignTo,
    optional: true,
  },
  task: {
    ...task,
    optional: true,
  },
  startDate: {
    ...startDate,
    optional: true,
  },
  endDate: {
    ...endDate,
    optional: true,
  },
};
