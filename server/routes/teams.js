/* Defines all routes under /api/teams/ */

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
const MilestoneSubmission = require("../models/MilestoneSubmission");

function find_team(id, populate, include_content, callback) {
  const filter = id.length > 0 ? { _id: id } : {};
  const query = Team.find(filter);
  if (populate) {
    query
      .populate("members")
      .populate("submissions", include_content ? "" : "-form_response")
      .populate("feedback", include_content ? "" : "-body");
  }
  query.exec((err, data) => {
    callback(data);
  });
}

//get information about all the teams
router.get("/", (req, res) => {
  find_team(
    "",
    req.query.populate === "true",
    req.query.include_content === "true",
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

router.post("/:team_id/mark-complete", (req, res) => {
  MilestoneSubmission.create({
    team: req.params["team_id"],
    // milestone: req.body.milestone_id,
    timestamp: Date.now(),
    form_response: "Manually credited milestone"
  }).then(submission => {
    Team.findByIdAndUpdate(req.params["team_id"], {
      $push: { submissions: submission._id }
    }).then(team => {
      res.sendStatus(204);
    });
  });
});

//delete a team member from a team
//needs validation that team_member or admin is making this request
router.delete("/:team_id/remove-member", (req, res) => {
  Team.findByIdAndUpdate(req.params["team_id"], {
    $pull: { members: req.body["user_id"] }
  }).then(team => {
    User.findByIdAndUpdate(req.body["user_id"], { team: null }).then(user => {
      res.sendStatus(204);
    });
  });
});

//delete a team, also removes all members that link to that team
//needs validation that admin is making this request
router.delete("/:team_id", (req, res) => {
  Team.findByIdAndRemove(req.params["team_id"], team => {
    team.members.forEach(user_id => {
      User.findByIdAndUpdate(user_id, { team: null });
    });
    res.sendStatus(204);
  });
});

module.exports = router;
