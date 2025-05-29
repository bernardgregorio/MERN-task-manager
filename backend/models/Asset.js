import mongoose from "mongoose";
import Task from "./Task.js";
const schema = mongoose.Schema;

const AssetSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Task,
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

export default mongoose.model("Asset", AssetSchema);
