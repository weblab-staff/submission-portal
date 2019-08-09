const User = require("../models/User");

let user;

async function login(userObj) {
  user = await new User(userObj).save();
  return user;
}

function getUser() {
  return user;
}

module.exports = {
  login,
  getUser
};
