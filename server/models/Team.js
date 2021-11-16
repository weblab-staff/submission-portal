const mongoose = require("mongoose");
const maxTeamLength = 50;

// FIXME: this is a sketchy workaround to avoid using mongoose-unique-validator since it has a bug that causes
// it to invalidate documents erroneously on saving existing documents. This method allows us to simply check if
// another document exists with the same team (other than the current document). It provides the same (lack of)
// correctness guarantees in the face of concurrency.
let model;
const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    minlength: 1,
    maxlength: maxTeamLength,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: async function (v) {
        return !v.startsWith("'")
          && 0 == await model.aggregate([
            { $match: { _id: { $ne: mongoose.Types.ObjectId(this._id) } } },
            { $project: { team_name: { $toLower: "$team_name" } } },
            { $match: { team_name: this.team_name.toLowerCase() } },
          ]).then(res => res.length);
      }
    }
  },
  github_url: String,
  competing: { type: Boolean, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "MilestoneSubmission" }],
  year: Number, // year the team was created
});
model = mongoose.model("Team", teamSchema);
module.exports = model;
