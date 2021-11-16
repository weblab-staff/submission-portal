const mongoose = require("mongoose");
const maxFieldLength = 50;
const userSchema = new mongoose.Schema({
  github_username: String,
  first_name: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength,
  },
  last_name: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength,
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength,
  },
  for_credit: { type: Boolean },
  statistics: {
    gender: String, // Deprecated. Don't add this to new students or show in UI
    pronouns: String,
    class_year: Number,
    experience: Number,
    living_group: String,
    shirt_size: String,
    mit_id: Number,
    kerb: {
      type: String,
      minlength: 1,
      maxlength: maxFieldLength,
    },
  },
  is_admin: Boolean,
  tags: [String],
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  year: Number, //year the student registered under
});
module.exports = mongoose.model("User", userSchema);
