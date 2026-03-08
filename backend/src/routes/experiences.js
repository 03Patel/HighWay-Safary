const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const Admin = require('../models/Admin')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

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

        if (!admin) return res.status(400).json({ error: "Invalid email or password" });


        const validPass = await bcrypt.compare(password, admin.password);

        if (!validPass) return res.status(400).json({ error: "Invalid email or Password" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



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




module.exports = router;