import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    // 🔥 SAVED ROADMAP PATHS
    savedPaths: [
  {
    // roadmap id
    id: {
      type: String,
      required: true,
    },

    // only course ids
    steps: [
      {
        type: String,
      },
    ],

    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;