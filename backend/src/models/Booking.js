const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    refId: {
        type: String,
        unique: true
    },

    experienceId: String,
    title: String,
    name: String,
    email: String,

    date: String,
    time: String,

    seats: Number,
    amount: Number,

    promoCode: String,

    status: {
        type: String,
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);  