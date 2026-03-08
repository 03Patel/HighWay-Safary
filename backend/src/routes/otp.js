const express = require('express');
const otpGenerator = require("otp-generator")

const sendEmail = require("../utils/sendEmail")

const router = express.Router();

// const otpStore = {};

// router.post("/send-otp", async (req, res) => {
//     const { email } = req.body;

//     try {
//         const otp = otpGenerator.generate(6, {
//             upperCaseAlphabets: false,
//             specialChars: false
//         });
//         otpStore[email] = otp;
//         await sendEmail(email, otp);

//         res.json({
//             success: true,
//             message: "OTP sent successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to send OTP"
//         });

//     }
// });


// router.post("/verify-otp", (req, res) => {

//     const { email, otp } = req.body;

//     if (otpStore[email] === otp) {

//         delete otpStore[email];

//         return res.json({
//             success: true,
//             message: "OTP verified"
//         });

//     }

//     res.status(400).json({
//         success: false,
//         message: "Invalid OTP"
//     });

// });

import express from "express";
import sgMail from "@sendgrid/mail";

const app = express();
app.use(express.json());

// Temporary OTP store (for demo; use DB or Redis in production)
const otpStore = {};

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/api/otp/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP with 5 min expiry
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Create email message
    const msg = {
      to: email,
      from: process.env.SENDGRID_VERIFIED_EMAIL,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    };

    await sgMail.send(msg);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Server error sending OTP" });
  }
});

// Verify OTP endpoint
app.post("/api/otp/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "OTP not found" });
  if (Date.now() > record.expires) return res.status(400).json({ message: "OTP expired" });
  if (parseInt(otp) !== record.otp) return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[email]; // Remove OTP after verification
  res.json({ message: "OTP verified successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));

module.exports = router;
