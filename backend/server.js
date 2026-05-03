import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Course from "./models/Course.js";
import Stream from "./models/Stream.js";
import Job from "./models/Job.js";
import Path from "./models/Path.js";
// const authRoutes = require("./routes/authRoutes");
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import otpRoutes from "./routes/otpRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/otp", otpRoutes);

app.use("/api/auth", authRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.get("/api/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/streams", async (req, res) => {
  const streams = await Stream.find();
  res.json(streams);
});

app.get("/api/streams/:id", async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);

    if (!stream) {
      return res.status(404).json({ message: "Stream not found" });
    }

    res.json(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/paths", async (req, res) => {
  try {
    const paths = await Path.find();
    res.json(paths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/paths/career/:careerId", async (req, res) => {
  try {
    const paths = await Path.find({ careerId: req.params.careerId });
    res.json(paths);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// margaDarshika%#))
// marga_darshika_mongo_data

// mongodb+srv://marga_darshika_mongo_data:margaDarshika%#))@cluster0.ajkactn.mongodb.net/?appName=Cluster0