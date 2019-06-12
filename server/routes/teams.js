/* Defines all routes under /api/teams/ */

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");

function find_team(id, populate, ignore_content, callback) {
  const filter = id.length > 0 ? { _id: id } : {};
  const query = Team.find(filter);
  if (populate) {
    query
      .populate("members")
      .populate("submisions", ignore_content ? "-form_response" : "")
      .populate("feedback", ignore_content ? "-body" : "");
  }
  query.exec((err, data) => {
    callback(data);
  });
}

//get information about all the teams, uses query params to decide how much content to return to user
router.get("/", (req, res) => {
  find_team(
    "",
    req.query.populate === "true",
    req.query.ignore_content === "true",
    data => res.send(data)
  );
});

//find and get all information about a specific team
router.get("/:team_id", (req, res) => {
  find_team(req.params["team_id"], true, false, data => res.send(data));
});

//create a team
router.post("/", (req, res) => {
  Team.create({
    team_name: req.body["team_name"],
    members: [req.body["creator_id"]],
    competing: req.body["is_competing"]
  }).then(team => {
    User.findByIdAndUpdate(req.body["creator_id"], { team: team._id }).then(
      (userErr, user) => {
        res.sendStatus(204);
      }
    );
  });
});

//add members to a team
//TODO NEEDS VALIDATION
router.post("/:team_id", (req, res) => {
  Team.findByIdAndUpdate(req.params["team_id"], {
    $push: { members: req.body["user_id"] }
  }).then(team => {
    User.findByIdAndUpdate(req.body["user_id"], { team: team._id }).then(
      user => {
        res.sendStatus(204);
      }
    );
  });
});

module.exports = router;
