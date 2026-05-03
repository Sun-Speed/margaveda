import mongoose from "mongoose";

const streamSchema = new mongoose.Schema({
  _id: {
    type: String,   // e.g. "science"
    required: true,
  },

  name: String,

  level: String,
  after: String,
  duration: String,

  description: String,

  subjects1: [String],
  subjects2: [String],

  eligibility: String,

  difficultyLevel: String,
  demandTrend: String,

  recommendedFor: [String],

  entranceExams: [String],

  languages: [String],

  avgFees: Number,

  skillsGained: [String],

  futureScope: [String],

  relatedCourses: [String],

  abroadOptions: [String],

  topColleges: [String],

  scholarships: [String],

  famousPeople: [String]

}, {
  timestamps: true
});

export default mongoose.model("Stream", streamSchema);