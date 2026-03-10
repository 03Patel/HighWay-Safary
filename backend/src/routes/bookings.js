const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');
const sendBookingEmail = require("../utils/sendBookingEmail");

router.post('/', async (req, res) => {
    try {

        const { experienceId, refId, name, email, date, time, seats, promoCode, status, title } = req.body;

        console.log("Booking Data:", req.body);

        const exp = await Experience.findById(experienceId);

        if (!exp) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        // calculate amount
        const amount = exp.price * seats;

        const booking = await Booking.create({
            experienceId,
            refId,
            title,
            name,
            email,
            date,
            time,
            seats,
            amount,
            promoCode,
            status
        });

        res.json({
            success: true,
            booking
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
});



router.get("/", async (req, res) => {
    try {

        const bookings = await Booking.find()
            .select("refId name status")   // only these fields
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
});



router.put("/:id", async (req, res) => {

    const { status } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, { status });

    res.json({ success: true });

});



router.delete("/:id", async (req, res) => {

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ success: true });

});



router.put("/update-status/:id", async (req, res) => {

    try {

        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }


        await sendBookingEmail({
            name: booking.name,
            email: booking.email,
            status: booking.status,
            refId: booking.refId,
            date: booking.date,
            time: booking.time,
            seats: booking.seats,
            title: booking.title,
            price: booking.amount
        });

        res.json({
            success: true,
            message: "Booking updated and email sent",
            booking
        });

    } catch (error) {

        console.log("Update Status Error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

});


module.exports = router;