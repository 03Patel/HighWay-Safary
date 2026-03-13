const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    refId: {
        type: String,
        unique: true
    },

    experienceId: String,
    title: String,
    image: String,
    name: String,
    email: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
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