import mongoose from "mongoose";
import TodoStatus from "./TodoStatus.js";

const schema = mongoose.Schema;

const TaskSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Priority",
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TodoStatus",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: String,
    default: null,
  },
});

TaskSchema.pre("save", async function (next) {
  if (!this.status) {
    const todoStatus = await TodoStatus.findOne().sort({ _id: 1 });
    this.status = todoStatus ? todoStatus._id : null;
  }
  next();
});

TaskSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Todo.updateMany({ task: doc._id }, { task: null });
  }
});

export default mongoose.model("Task", TaskSchema);
