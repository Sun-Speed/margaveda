import Feedback from "../models/Feedback.js";

export const submitFeedback = async (
  req,
  res
) => {

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