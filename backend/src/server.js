require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const otpRoutes = require("./routes/otp");
const experiencesRoute = require("./routes/experiences");
const bookingsRoute = require("./routes/bookings");
const promoRoute = require("./routes/promo");


const app = express(); // must come first

app.use(cors());
app.use(express.json());

/* Routes */

app.use("/api/otp", otpRoutes);
app.use("/api/experiences", experiencesRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/promo", promoRoute);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on", PORT));
  })
  .catch(err => console.error(err));