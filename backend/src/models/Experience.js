const mongoose = require('mongoose');


const SlotSchema = new mongoose.Schema({
    date: String,
    times: [{ time: String, capacity: Number, booked: { type: Number, default: 0 } }]
});


const ExperienceSchema = new mongoose.Schema({
    title: String,
    slug: String,
    location: String,
    price: Number,
    duration: String,
    description: String,
    image: String,
    slots: [SlotSchema]
});


module.exports = mongoose.model('Experience', ExperienceSchema);