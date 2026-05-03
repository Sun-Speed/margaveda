import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: {
    type: String,   // e.g. "course_be_cse"
    required: true,
  },

  name: String,

  level: String,
  levelFilter: String,

  after: String,
  duration: String,

  cluster: String,

  streams: [String],
  subStreams: [String],

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

  famousPeople: [String],

  nextCourses: [String],
}, {
  timestamps: true   // adds createdAt & updatedAt automatically
});

export default mongoose.model("Course", courseSchema);
