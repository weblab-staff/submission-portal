const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const maxFieldLength = 50;
const userSchema = new mongoose.Schema({
  github_username: String,
  first_name: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength,
    uniqueCaseInsensitive: true
  },
  last_name: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength
  },
  email: {
    type: String,
    minlength: 1,
    maxlength: maxFieldLength
  },
  for_credit: { type: Boolean },
  statistics: {
    gender: String,
    class_year: Number,
    experience: Number,
    living_group: String
  },
  is_admin: Boolean,
  tags: [String],
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  year: Number //year the student registered under
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
