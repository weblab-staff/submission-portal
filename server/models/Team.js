const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  team_name: String,
  github_url: String,
  competing: Boolean,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  submissions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MilestoneSubmission" }
  ],
  year: Number
});

module.exports = mongoose.model("Team", teamSchema);
