import express from "express";
import { sendOTPEmail } from "../utils/sendEmail.js";
import  generateOTP  from "../utils/generateOtp.js";

const router = express.Router();

router.post("/send-otp", async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const otp = generateOTP();

    console.log("Generated OTP:", otp);
    console.log("Calling sendOTPEmail...");

    await sendOTPEmail(email, otp);
    console.log("Called sendOTPEmail...");

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });

  }

});

export default router;