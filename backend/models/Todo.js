import mongoose from "mongoose";
const schema = mongoose.Schema;

const TodoSchema = new schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    nullable: false,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  // status: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Status",
  // },
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
    nullable: true,
  },
});

export default mongoose.model("Todo", TodoSchema);
