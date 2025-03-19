import mongoose from "mongoose";
const schema = mongoose.Schema;

const RoleSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

export default mongoose.model("Role", RoleSchema);
