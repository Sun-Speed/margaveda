import express from "express";
import { sendOtp, verifyOtp, signupUser, loginUser, otpLogin, getMe, savePath, removeSavedPath, submitFeedback } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
// import {  } from "../controllers/authController.js";
// import {  } from "../controllers/authController.js";
// import { signupUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp); // ✅ THIS LINE
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/otp-login", otpLogin);

router.get("/me", getMe);

router.post("/save", authMiddleware, savePath);
router.delete("/remove-path", authMiddleware, removeSavedPath);

router.post("/submit", submitFeedback);


router.get("/send-otp", (req, res) => {
  res.send("Use POST request with identifier");
});

export default router;