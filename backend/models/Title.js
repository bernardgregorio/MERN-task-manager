import mongoose from "mongoose";
const schema = mongoose.Schema;

const TitleSchema = new schema({
  name: {
    type: String,
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

export default mongoose.model("Title", TitleSchema);
