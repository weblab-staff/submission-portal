const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const milestoneSubmissionSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
  timestamp: Date,
  form_response: mongoose.Schema.Types.Mixed,
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Email" }],
  key: { type: mongoose.Schema.Types.String, unique: true },
});

milestoneSubmissionSchema.plugin(uniqueValidator);
module.exports = mongoose.model("MilestoneSubmission", milestoneSubmissionSchema);
