const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  team_size_cap: Number,
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  active_year: Number
});

module.exports = mongoose.model("Class", classSchema);
