import mongoose from "mongoose";
import Status from "./Status.js";
import Todo from "./Todo.js";

const schema = mongoose.Schema;

const TaskSchema = new schema({
  taskId: {
    type: String,
    unique: true,
  },
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
    ref: "Status",
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    nullable: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    nullable: true,
  },
});

TaskSchema.pre("save", async function (next) {
  if (!this.taskId) {
    const lastTask = await mongoose
      .model("Task")
      .findOne({ taskId: { $regex: /^TASK-\d+$/ } })
      .sort({ taskId: -1 });

    const lastTaskId = lastTask
      ? parseInt(lastTask.taskId.split("-")[1], 10)
      : 0;
    const newTaskId = `TASK-${String(lastTaskId + 1).padStart(4, "0")}`;

    this.taskId = newTaskId;
  }

  if (!this.status) {
    const defaultStatus = await Status.findOne().sort({ _id: 1 });
    this.status = defaultStatus ? defaultStatus._id : null;
  }

  next();
});

TaskSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Todo.updateMany({ task: doc._id }, { task: null });
  }
});

export default mongoose.model("Task", TaskSchema);
