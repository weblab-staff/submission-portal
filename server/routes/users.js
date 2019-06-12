/* Defines all routes under /api/users/ */

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  User.find({}).then(users => {
    res.send(users);
  });
});

router.get("/:user_id", (req, res) => {
  User.findOne({ _id: req.params["user_id"] }).then(users => {
    res.send(users);
  });
});

module.exports = router;
