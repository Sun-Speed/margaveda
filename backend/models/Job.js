import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  _id: {
    type: String, // e.g. "job_01"
    required: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  domain: {
    type: String,
    required: true,
    lowercase: true, // 🔥 auto-fix "Tech" → "tech"
    enum: [
      "tech",
      "cybersecurity",
      "data_ai",
      "core_engineering",
      "emerging_tech",
      "product_design",
      "business",
      "education",
      "government",
      "entrepreneurship"
    ]
  },

  description: {
    type: String
  },

  requiredCourses: [
    {
      type: String
    }
  ],

  requiredSkills: [
    {
      type: String
    }
  ],

  avgSalary: {
    type: String
  },

  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    currency: {
      type: String,
      default: "LPA"
    }
  },

  demandTrend: {
    type: String,
    enum: ["Low", "Medium", "High", "Very High"]
  },

  popularityScore: {
    type: Number,
    default: 0
  },

  sector: [
    {
      type: String
    }
  ],

  tags: [
    {
      type: String,
      lowercase: true // 🔥 ensures consistency
    }
  ],

  educationLevel: [
    {
      type: String,
      enum: ["ug", "pg"]
    }
  ],

  level: [
    {
      type: String,
      enum: ["entry", "mid", "senior"]
    }
  ],

  difficultyLevel: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },

  workType: [
    {
      type: String,
      enum: ["remote", "hybrid", "onsite"]
    }
  ],

  minQualification: {
    type: String
  },

  growth: [
    {
      type: String
    }
  ],

  entryType: [
    {
      type: String
    }
  ],

  companies: [
    {
      type: String
    }
  ],

  featured: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

export default mongoose.model("Job", jobSchema);