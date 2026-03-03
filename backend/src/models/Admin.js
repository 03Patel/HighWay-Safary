const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Admin", adminSchema);
