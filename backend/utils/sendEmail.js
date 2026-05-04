import { Resend } from "resend";

export const sendOTPEmail = async (email, otp) => {

  try {

    console.log("Sending OTP Email...");

    const resend = new Resend(
      process.env.RESEND_API_KEY
    );

    const response = await resend.emails.send({

      from: process.env.EMAIL_FROM,

      to: email,

      subject: "Marga Veda OTP Verification",

      html: `
        <div style="
          font-family: Arial;
          padding: 20px;
        ">

          <h1 style="color:#2563eb;">
            Marga Veda
          </h1>

          <p>Your OTP code is:</p>

          <h2 style="
            letter-spacing:5px;
            font-size:32px;
            color:#f59e0b;
          ">
            ${otp}
          </h2>

          <p>This OTP expires in 5 minutes.</p>

        </div>
      `,
    });

    console.log("EMAIL RESPONSE:", response);

    return response;

  } catch (error) {

    console.log("EMAIL ERROR:", error);

    throw error;

  }

};