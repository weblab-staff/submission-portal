/* Defines all routes under /api/teams/ */

const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
const Milestone = require("../models/Milestone");
const MilestoneSubmission = require("../models/MilestoneSubmission");
const util = require("./util");
const ensure = require("./ensure");
const github = require("../github");
const errorWrap = require("./errorWrap");
const ValidationError = require("../errors/ValidationError");
const utils = require("./util");

function find_team(year, id, populate, include_content, callback) {
  const filter = id.length > 0 ? { _id: id } : { year: year };
  const query = Team.find(filter);
  if (populate) {
    query.populate("members").populate({
      path: "submissions",
      select: include_content ? "" : "-form_response",
      populate: [
        { path: "milestone", select: "title description" },
        { path: "feedback", select: include_content ? "" : "-body" },
      ],
    });
  }
  return query.exec();
}

function get_feedback_subject(milestone_name) {
  return "Feedback for " + milestone_name;
}

//get information about all the teams
router.get(
  "/",
  ensure.loggedIn, // TODO: dont show details to non-admins
  errorWrap(async (req, res) => {
    let teams = await find_team(
      req.year,
      "",
      req.query.populate === "true",
      req.query.include_content === "true"
    );
    if (req.query.searchQuery && req.query.searchQuery.length > 1) {
      teams = utils.searchFilter(teams, req.query.searchQuery, ["team_name"]);
    }

    res.send(teams.map(flipTeamSubmissions));
  })
);

//find and get all information about a specific team
router.get(
  "/:team_id",
  ensure.onTeam,
  errorWrap(async (req, res) => {
    let team = await find_team(
      req.year,
      req.params.team_id,
      true, //populate always true for individual team
      true //always include content for individual team
    );
    team = team.map(flipTeamSubmissions);

    res.send(team.length == 0 ? undefined : team[0]);
  })
);

//create a team
//defaults to creating that team for the active year
//needs validation to see if registration is open, and request is coming from creator_id / admin
router.post(
  "/",
  ensure.loggedIn,
  errorWrap(async (req, res) => {
    const team = new Team({
      team_name: req.body.team_name,
      members: [req.user],
      competing: req.body.is_competing,
      year: req.year,
    });
    const validationErrors = team.validateSync();
    if (validationErrors) {
      throw new ValidationError(validationErrors.message);
    }

    await team.save();
    await User.findByIdAndUpdate(req.body.creator_id, { team: team._id });
    res.send(team);
  })
);

//add members to a team
//TODO NEEDS VALIDATION
//should not be able to add duplicate team members!
router.post(
  "/:team_id",
  ensure.admin,
  errorWrap(async (req, res) => {
    const team = await Team.findByIdAndUpdate(req.params.team_id, {
      $addToSet: { members: req.body.user_id },
    });

    await User.findByIdAndUpdate(req.body.user_id, { team: team._id });
    res.sendStatus(204);
  })
);

router.post(
  "/:team_id/mark-complete",
  ensure.admin,
  errorWrap(async (req, res) => {
    const submission = new MilestoneSubmission({
      team: req.params.team_id,
      milestone: req.body.milestone_id,
      timestamp: Date.now(),
      form_response: "Manually credited milestone",
    });

    await submission.save();
    await Team.findByIdAndUpdate(req.params.team_id, {
      $push: { submissions: submission._id },
    });
    res.sendStatus(204);
  })
);

// (this route has no automated tests)
router.post(
  "/:team_id/generate-github",
  ensure.onTeam,
  errorWrap(async (req, res) => {
    const team = await Team.findOne({ _id: req.params.team_id }).populate(
      "members",
      "github_username"
    );

    const url = await github.generate(team);

    team.github_url = url;
    await team.save();
    res.send({ url });
  })
);

// (this route has no automated tests)
router.post(
  "/:team_id/feedback",
  ensure.admin,
  errorWrap(async (req, res) => {
    const team_id = req.params.team_id;
    const feedback = req.body.feedback;
    const sender = req.user;
    const submission = await MilestoneSubmission.findOne({
      _id: req.body.milestone_submission_id,
    });
    const milestone = await Milestone.findOne({
      _id: submission.milestone,
    });
    const subject = get_feedback_subject(milestone.title);
    const email = await util.send_email(
      [],
      [team_id],
      subject,
      feedback,
      sender
    );
    await MilestoneSubmission.findByIdAndUpdate(submission._id, {
      $push: { feedback: email._id },
    });
    res.send(email);
  })
);

router.post(
  "/:team_id/set-competing",
  ensure.onTeam,
  errorWrap(async (req, res) => {
    await Team.findByIdAndUpdate(req.params.team_id, {
      competing: req.body.competing,
    });

    res.sendStatus(204);
  })
);

//delete a team member from a team
router.delete(
  "/:team_id/remove-member",
  ensure.onTeam,
  errorWrap(async (req, res) => {
    await Team.findByIdAndUpdate(req.params.team_id, {
      $pull: { members: req.body.user_id },
    });

    await User.findByIdAndUpdate(req.body.user_id, { team: null });
    res.sendStatus(204);
  })
);

//delete a team, also removes all members that link to that team
router.delete(
  "/:team_id",
  ensure.admin,
  errorWrap(async (req, res) => {
    const team = await Team.findByIdAndDelete(req.params.team_id);

    await Promise.all(
      team.members.map((user_id) => {
        return User.findByIdAndUpdate(user_id, { team: null });
      })
    );
    res.sendStatus(204);
  })
);

const flipTeamSubmissions = (team) => {
  const flippedSubmissions = {};
  if (team) {
    team.submissions.forEach((submission) => {
      if (
        submission.milestone !== undefined &&
        submission.milestone._id !== undefined
      ) {
        flippedSubmissions[submission.milestone._id] = flippedSubmissions[
          submission.milestone._id
        ]
          ? flippedSubmissions[submission.milestone._id].concat(submission)
          : [];
      }
    });
  }
  let teamJson = team.toJSON();
  teamJson.submissions = flippedSubmissions;
  return teamJson;
};

module.exports = router;
