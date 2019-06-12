const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
  student_link: String,
  responses_sheet: String,
  submission_closed: Boolean,
  year: Number
});

module.exports = mongoose.model("Milestone", milestoneSchema);
