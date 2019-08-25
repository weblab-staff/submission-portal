const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  handin_link: String,
  responses_link: String,
  autograde: Boolean,
  submission_closed: Boolean,
  submission_count: Number,
  year: Number,
});

module.exports = mongoose.model("Milestone", milestoneSchema);
