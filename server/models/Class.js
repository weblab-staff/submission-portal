const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  team_size_cap: Number,
  admins: [String], // GITHUB IDs
  year: Number,
  is_active: Boolean,
  registration_open: Boolean,
});

module.exports = mongoose.model("Class", classSchema);
