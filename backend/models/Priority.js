import mongoose from "mongoose";
const schema = mongoose.Schema;

const PrioritySchema = new schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
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

export default mongoose.model("Priority", PrioritySchema);
