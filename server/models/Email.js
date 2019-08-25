const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  timestamp: Date,
  subject: String,
  body: String,
  from: String, //name of admin
  user_targets: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  team_targets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
});

module.exports = mongoose.model("Email", emailSchema);
