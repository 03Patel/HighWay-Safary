const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const sendBookingEmail = require("../utils/sendBookingEmail");

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
            experienceTitle: booking.experienceTitle,
            price: booking.total
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