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
  User.findOne({ _id: req.params["user_id"] })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/:user_id/update", (req, res) => {
  User.findOne({ _id: req.params["user_id"] }).then(user => {
    if (user) {
      for (const [key, value] of Object.entries(req.body)) {
        user[key] = value;
      }
      user.save();
      res.sendStatus(204);
    } else {
      console.log(`No User found with ID ${req.params["user_id"]}`);
      res.sendStatus(400);
    }
  });
});

router.delete("/:user_id", (req, res) => {
  User.findByIdAndDelete(req.params["user_id"], (err, res) => {
    if (err) {
      console.log("error deleting");
      res.status(500);
    } else {
      console.log(`deleted user ${req.params["user_id"]}`);
      res.sendStatus(204);
    }
  });
});
module.exports = router;
