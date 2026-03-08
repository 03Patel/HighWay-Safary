const nodemailer = require("nodemailer");

const sendBookingEmail = async (booking) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {
        name,
        email,
        status,
        refId,
        date,
        time,
        seats,
        title,
        price
    } = booking;

    let subject = "";
    let message = "";

    if (status === "confirmed") {
        subject = "Booking Confirmed";
    }

    if (status === "cancelled") {
        subject = "Booking Cancelled";
    }

    message = `
  <div style="font-family: Arial; padding:20px">

    <h2>Hello ${name}</h2>

    <p>Your booking status is:
      <b style="color:${status === "confirmed" ? "green" : "red"}">
      ${status.toUpperCase()}
      </b>
    </p>

    <h3>Booking Details</h3>

    <table border="1" cellpadding="10" cellspacing="0">
      <tr>
        <td><b>Reference ID</b></td>
        <td>${refId}</td>
      </tr>

      <tr>
        <td><b>Title</b></td>
        <td>${title}</td>
      </tr>

      <tr>
        <td><b>Date</b></td>
        <td>${date}</td>
      </tr>

      <tr>
        <td><b>Time</b></td>
        <td>${time}</td>
      </tr>

      <tr>
        <td><b>Seats</b></td>
        <td>${seats}</td>
      </tr>

      <tr>
        <td><b>Total Price</b></td>
        <td>₹${price}</td>
      </tr>
    </table>

    <br/>

    <p>Thank you for booking with us.</p>

  </div>
  `;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: message
    });

};

module.exports = sendBookingEmail;