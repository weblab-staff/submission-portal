const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  github_id: String,
  first_name: String,
  last_name: String,
  email: String,
  for_credit: Boolean,
  statistics: {
    gender: String,
    class_year: Number,
    experience: Number,
    living_group: String
  },
  is_admin: Boolean,
  tags: [String],
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
});

module.exports = mongoose.model("User", userSchema);
