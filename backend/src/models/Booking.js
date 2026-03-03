const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience' },
name: String,
email: String,
phone: String,
date: String,
time: String,
seats: Number,
amount: Number,
promoCode: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Booking', BookingSchema);