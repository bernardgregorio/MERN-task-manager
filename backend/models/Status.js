import mongoose from "mongoose";
const schema = mongoose.Schema;
const Status = new schema({
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    default: null,
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

export default mongoose.model("Status", Status);
