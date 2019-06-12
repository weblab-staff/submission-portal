const mongoose = require("mongoose");

const milestoneSubmissionSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
  timestamp: Date,
  form_response: mongoose.Schema.Types.Mixed,
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Email" }]
});

module.exports = mongoose.model(
  "MilestoneSubmission",
  milestoneSubmissionSchema
);
