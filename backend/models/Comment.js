import mongoose from "mongoose";
const schema = mongoose.Schema;

const CommentSchema = new schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fromModel: {
    type: String,
    required: true,
    enum: ["Task", "Todo"],
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "fromModel",
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

export default mongoose.model("Comment", CommentSchema);
