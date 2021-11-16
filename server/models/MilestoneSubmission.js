const mongoose = require("mongoose");

// FIXME: this is a sketchy workaround to avoid using mongoose-unique-validator since it has a bug that causes
// it to invalidate documents erroneously on saving existing documents. This method allows us to simply check if
// another document exists with the same team (other than the current document). It provides the same (lack of)
// correctness guarantees in the face of concurrency.
let model;
const milestoneSubmissionSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  milestone: { type: mongoose.Schema.Types.ObjectId, ref: "Milestone" },
  timestamp: Date,
  form_response: mongoose.Schema.Types.Mixed,
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Email" }],
  key: {
    type: mongoose.Schema.Types.String, unique: true, validate: {
      validator: async function (key) {
        return 0 === await model.find({ _id: { $ne: this._id }, key: this.key }).countDocuments();
      }
    }
  },
});

model = mongoose.model("MilestoneSubmission", milestoneSubmissionSchema);
module.exports = model;
