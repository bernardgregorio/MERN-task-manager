import mongoose from "mongoose";
import Status from "./Status.js";
import Role from "./Role.js";
import Title from "./Title.js";
import Todo from "./Todo.js";
const schema = mongoose.Schema;

const UserSchema = new schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Title",
    nullable: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],

  status: {
    type: Number,
    default: 1,
    enum: [1, 2],
  },
  refreshToken: {
    type: String,
    default: null,
  },
  googleId: {
    type: String,
    default: null,
  },
  expirationDate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    },
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

UserSchema.pre("save", async function (next) {
  if (!this.role) {
    const role = await Role.findOne().sort({ _id: 1 });
    this.role = role ? role._id : null;
  }

  if (!this.status) {
    const status = await Status.findOne().sort({ _id: 1 });
    this.status = status ? status._id : null;
  }

  if (!this.title) {
    const titleCount = await Title.countDocuments();
    if (titleCount > 0) {
      const randomIndex = Math.floor(Math.random() * titleCount);
      const title = await Title.findOne().skip(randomIndex);
      this.title = title ? title._id : null;
    } else {
      this.title = null;
    }
  }

  next();
});

UserSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Todo.updateMany({ assignTo: doc._id }, { assignTo: null });
  }
});

export default mongoose.model("User", UserSchema);
