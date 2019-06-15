/* Defines all routes under /api/users/ */

const express = require("express");
const router = express.Router();
const User = require("../models/User");

function find_user(id, populate, callback) {
  const filter = id.length > 0 ? { _id: id } : {};
  const query = User.find(filter);
  if (populate) {
    query.populate("team");
  }
  query.exec((err, data) => {
    callback(data);
  });
}

router.get("/", (req, res) => {
  find_user("", req.query.populate === "true", data => res.send(data));
});

router.get("/:user_id", (req, res) => {
  find_user(req.params["user_id"], true, data => res.send(data));
});

router.post("/:user_id/update", (req, res) => {
  const updates = req.body;
  User.findByIdAndUpdate(req.params["user_id"], updates)
    .catch(err => {
      console.log(err);
      console.log(`No User found with ID ${req.params["user_id"]}`);
      res.sendStatus(400);
    })
    .then(data => {
      res.sendStatus(204);
    })
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
