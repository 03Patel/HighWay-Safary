const express = require('express');
const otpGenerator = require("otp-generator")

const sendEmail = require("../utils/sendEmail")

const router = express.Router();

const otpStore = {};

router.post("/send-otp", async (req, res) => {
    const { email } = req.body;

    try {
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false
        });
        otpStore[email] = otp;
        await sendEmail(email, otp);

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });

    }
});


router.post("/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    if (otpStore[email] === otp) {

        delete otpStore[email];

        return res.json({
            success: true,
            message: "OTP verified"
        });

    }

    res.status(400).json({
        success: false,
        message: "Invalid OTP"
    });

});

module.exports = router;