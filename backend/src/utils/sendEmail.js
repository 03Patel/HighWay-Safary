const nodemailer = require("nodemailer")

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        form: process.env.EMAIL_USER,
        to: email,
        subject: "Booking OTP Verification",
        html: `
        <h2>Email Verification </h2>
        <p> Your OTP for booking verification is :</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
        `
    }


    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail;