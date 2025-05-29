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

const prioritySchema = yup
  .string()
  .notOneOf(["0"], "Please select a priority.")
  .nullable(false);
const statusSchema = yup
  .string()
  .notOneOf(["0"], "Please select a status.")
  .nullable(false);

const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize to midnight

const startDateSchema = yup
  .date()
  .typeError("Please enter a valid date.")
  .nullable(false)
  .test(
    "is-updated",
    "Start date must be today or in the future.",
    function (value) {
      if (this.parent.startDate === this.originalValue) return true;
      return value >= today;
    }
  );

const endDateSchema = yup
  .date()
  .typeError("Please enter a valid date.")
  .nullable(false)
  .test(
    "is-updated",
    "End date cannot be before start date.",
    function (value) {
      if (this.parent.endDate === this.originalValue) return true;
      return value >= this.parent.startDate;
    }
  );

export const createTaskValidation = yup.object({
  title: titleSchema.required("Please enter title."),
  description: descriptionSchema.required("Please enter description."),
  priority: prioritySchema.required("Please select priority."),
  status: statusSchema.required("Please select status."),
  startDate: startDateSchema.required("Please select start date."),
  endDate: endDateSchema.required("Please select end date."),
});

export const updateTaskValidation = yup.object({
  title: titleSchema.notRequired(),
  description: descriptionSchema.notRequired(),
  priority: prioritySchema.notRequired(),
  status: statusSchema.notRequired(),
  startDate: startDateSchema.notRequired(),
  endDate: endDateSchema.notRequired(),
});
