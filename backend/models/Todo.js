import mongoose from "mongoose";

const schema = mongoose.Schema;

const TodoSchema = new schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TodoStatus",
  },
  assignTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    nullable: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    nullable: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Todo", TodoSchema);
