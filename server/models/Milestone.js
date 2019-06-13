const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  handin_link: String,
  responses_link: String,
  autograde: Boolean,
  submission_closed: Boolean,
  year: Number
});

module.exports = mongoose.model("Milestone", milestoneSchema);
