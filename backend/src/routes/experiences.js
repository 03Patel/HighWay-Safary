const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const Admin = require('../models/Admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const User = require("../models/User.js")

router.get('/', async (req, res) => {
    const items = await Experience.find({});
    res.json(items);
});



router.get('/:id', async (req, res) => {
    const item = await Experience.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
});


router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const validPass = await bcrypt.compare(password, admin.password);

        if (!validPass) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (err) {

        return res.status(500).json({ error: err.message });

    }
});



router.delete("/:id", auth, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) return res.status(400).json({ error: "Ticket not found" });
        res.json({ message: "Ticket deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "server error" })
    }
})




router.put("/:id", async (req, res) => {
    const updated = await Experience.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
});



/* -------- USER SIGNUP -------- */

router.post("/signup", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
});


/* -------- USER LOGIN -------- */

router.post("/signin", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.role !== "user") {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }
});



module.exports = router;