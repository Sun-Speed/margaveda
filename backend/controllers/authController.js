import OTP from "../models/Otp.js";
import generateOTP from "../utils/generateOtp.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/sendEmail.js";
import Feedback from "../models/Feedback.js";

// 🔐 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// 🚀 SEND OTP
export const sendOtp = async (req, res) => {

  try {

    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({
        message: "Identifier required"
      });
    }

    const otp = generateOTP();

    await OTP.deleteMany({ identifier });

    const newOtp = new OTP({
      identifier,
      otp,
      expiresAt: new Date(
        Date.now() + 5 * 60 * 1000
      ),
    });

    await newOtp.save();

    console.log("Generated OTP:", otp);

    await sendOTPEmail(identifier, otp);

    console.log("OTP Email Sent");

    return res.json({
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error(
      "Send OTP Error:",
      error
    );

    res.status(500).json({
      message: "Server error"
    });

  }

};

// 🚀 VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ message: "Identifier and OTP required" });
    }

    const record = await OTP.findOne({ identifier });

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // ⏳ Expiry check
    if (record.expiresAt < new Date()) {
      await OTP.deleteMany({ identifier });
      return res.status(400).json({ message: "OTP expired" });
    }

    // ❌ Invalid OTP
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ Mark as verified
    record.isVerified = true;
    await record.save();

    console.log("OTP verified:", record.identifier);

    // 🔥 NEW PART (IMPORTANT)
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    // 🔥 RETURN THIS
    return res.json({
      message: "OTP verified successfully",
      isNewUser: !user, // 👈 KEY LINE
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🚀 SIGNUP USER
export const signupUser = async (req, res) => {
  try {
    const { identifier, name, password, avatar } = req.body;

    // 🔴 Validate
    if (!identifier || !name || !avatar) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🔐 Check OTP verified
    const otpRecord = await OTP.findOne({ identifier });

    if (!otpRecord || !otpRecord.isVerified) {
      return res.status(400).json({
        message: "OTP not verified. Please verify OTP first.",
      });
    }

    // 🔍 Check duplicate
    const isEmail = identifier.includes("@");

    const existingUser = await User.findOne(
      isEmail ? { email: identifier } : { phone: identifier }
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 🧾 Create user
    const newUser = new User({
      email: isEmail ? identifier : undefined,
      phone: !isEmail ? identifier : undefined,
      password: hashedPassword,
      name,
      avatar,
    });

    await newUser.save();

    // 🧹 Delete OTP after success
    const result = await OTP.deleteMany({ identifier });
    console.log("Deleted OTP count:", result.deletedCount);

    // 🔑 Generate token
    const token = generateToken(newUser);

    return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            avatar: newUser.avatar,
            identifier: newUser.email || newUser.phone, // 🔥 ADD THIS
        },
    });

    

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 🔴 1. Validate input
    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password required" });
    }

    // 🔍 2. Find user
    const isEmail = identifier.includes("@");

    const user = await User.findOne(
      isEmail ? { email: identifier } : { phone: identifier }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔐 3. Check password
    if (!user.password) {
      return res.status(400).json({ message: "Use OTP login instead" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔑 4. Generate token
    const token = generateToken(user);

    // 🍪 5. Set cookie
    res.cookie("token", token, {
      httpOnly: true,   // 🔐 can't access from JS
      secure: false,    // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const otpLogin = async (req, res) => {
  try {
    const { identifier } = req.body;

    const isEmail = identifier.includes("@");

    const user = await User.findOne(
      isEmail ? { email: identifier } : { phone: identifier }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found. Please signup." });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
            identifier: isEmail ? user.email : user.phone, // 👈 ADD THIS
        },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const savePath = async (req, res) => {

  try {

    const userId = req.user.id;

    const { path } = req.body;

    // 🔥 find logged in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 prevent duplicate saves
    const alreadySaved = user.savedPaths.find((saved) => {

  return JSON.stringify(saved.steps) ===
         JSON.stringify(path.steps);

});

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Path already saved",
      });
    }

    // 🔥 save path
    user.savedPaths.push(path);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Path saved successfully",
      savedPaths: user.savedPaths,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

};

export const removeSavedPath = async (req, res) => {

  try {

    const userId = req.user.id;

    const { pathId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔥 remove path
    user.savedPaths = user.savedPaths.filter(
      (path) => path.id !== pathId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Path removed successfully",
      savedPaths: user.savedPaths,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

};

export const submitFeedback = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({
        success: false,
        message: "Feedback required",
      });

    }

    const feedback =
      await Feedback.create({
        message,
      });

    res.status(201).json({
      success: true,
      message: "Feedback submitted",
      feedback,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};