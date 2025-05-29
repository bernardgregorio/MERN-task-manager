import * as yup from "yup";

const titleSchema = yup
  .string()
  .min(3, "Title must be at least 3 characters.")
  .max(100, "Title must be at most 100 characters.")
  .nullable(false);

const descriptionSchema = yup
  .string()
  .min(3, "Description must be at least 3 characters.")
  .max(200, "Description must be at most 200 characters.")
  .nullable(false);

const statusSchema = yup
  .string()
  .notOneOf(["0"], "Please select a status.")
  .nullable(false);

const assignToSchema = yup
  .string()
  .notOneOf(["0"], "Please select a assign to.")
  .nullable(false);

const taskSchema = yup
  .string()
  .notOneOf(["0"], "Please select a task.")
  .nullable(false);

const startDateSchema = yup
  .date()
  .typeError("Please enter a valid date.")
  .nullable(false);
const endDateSchema = yup
  .date()
  .typeError("Please enter a valid date.")
  .min(yup.ref("startDate"), "End date cannot be before start date.")
  .nullable(false);

export const createTodo = yup.object({
  title: titleSchema.required("Please enter a title."),
  description: descriptionSchema.required("Please enter a description."),
  status: statusSchema.required("Please select a status."),
  assignTo: assignToSchema,
  task: taskSchema.required("Please select a task."),
  startDate: startDateSchema.required("Please select a start date."),
  endDate: endDateSchema.required("Please select an end date."),
});

export const updateTodo = yup.object({
  title: titleSchema.notRequired(),
  description: descriptionSchema.notRequired(),
  status: statusSchema.notRequired(),
  assignTo: assignToSchema,
  task: taskSchema.notRequired(),
  startDate: startDateSchema.notRequired(),
  endDate: endDateSchema.notRequired(),
});
