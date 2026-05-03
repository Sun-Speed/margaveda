import mongoose from "mongoose";

const pathSchema = new mongoose.Schema({
  _id: {
    type: String,   // e.g. "path_qae_1"
    required: true
  },

  careerId: {
    type: String,   // links to Job (_id)
    required: true
  },

  title: {
    type: String,
    required: true
  },

  steps: [
    {
      type: String,  // course or stream IDs
      required: true
    }
  ],

  type: {
    type: String,
    enum: ["direct", "alternative", "advanced"], // scalable
    default: "direct"
  },

  duration: {
    type: String   // e.g. "4 years"
  }

}, {
  timestamps: true
});

export default mongoose.model("Path", pathSchema);