const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');


router.post('/', async (req, res)=>{
const { experienceId, name, email,  date, time, seats, promoCode } = req.body;
if(!experienceId || !name || !email || !date || !time || !seats) return res.status(400).json({ message: 'Missing required fields' });



const exp = await Experience.findById(experienceId);
if(!exp) return res.status(404).json({ message: 'Experience not found' });


const slot = exp.slots.find(s => s.date === date);
if(!slot) return res.status(400).json({ message: 'Date not available' });


const timeSlot = slot.times.find(t => t.time === time);
if(!timeSlot) return res.status(400).json({ message: 'Time slot not available' });



if(timeSlot.booked + seats > timeSlot.capacity) return res.status(409).json({ message: 'Not enough seats' });


timeSlot.booked += seats;
await exp.save();


const amount = (exp.price * seats);


const booking = await Booking.create({ experienceId, name, email, date, time, seats, amount, promoCode });


res.json({ success: true, booking });
});


module.exports = router;