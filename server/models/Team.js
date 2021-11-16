const mongoose = require("mongoose");
const maxTeamLength = 50;
var uniqueValidator = require("mongoose-unique-validator");

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    minlength: 1,
    maxlength: maxTeamLength,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: v => {
        return !v.startsWith("'");
      }
    }
  },
  github_url: String,
  competing: { type: Boolean, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "MilestoneSubmission" }],
  year: Number, // year the team was created
});
teamSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Team", teamSchema);
