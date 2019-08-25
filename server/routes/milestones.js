/* Defines all routes under /api/milestones/ */

const express = require("express");

const router = express.Router();
const Milestone = require("../models/Milestone");
const errorWrap = require("./errorWrap");
const ensure = require("./ensure");

// gets the list of milestones for the current class year
router.get(
  "/",
  ensure.loggedIn,
  errorWrap(async (req, res) => {
    let year_filter = { year: req.year };
    res.send(await Milestone.find(year_filter).sort({ deadline: "asc" }));
  })
);

router.get(
  "/:milestone_id",
  ensure.loggedIn,
  errorWrap(async (req, res) => {
    res.send(await Milestone.findById(req.params.milestone_id));
  })
);

// creates a new milestone for the current class year
// TODO VALIDATION LATER
router.post(
  "/",
  ensure.admin,
  errorWrap(async (req, res) => {
    const new_milestone = new Milestone({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      handin_link: req.body.handin_link,
      responses_link: req.body.responses_link,
      autograde: false,
      submission_closed: false,
      submission_count: 0,
      year: req.year,
    });

    res.send(await new_milestone.save());
  })
);

// sets the autograde status of a specific milestone
// TODO VALIDATION LATER
router.post(
  "/:milestone_id/set-autograde",
  ensure.admin,
  errorWrap(async (req, res) => {
    await Milestone.findByIdAndUpdate(req.params.milestone_id, {
      autograde: req.body.autograde, // TODO VALIDATION
    });

    res.sendStatus(204);
  })
);

// updates a milestone, cannot use to update autograde status as that requires validation
// TODO VALIDATION LATER
router.post(
  "/:milestone_id/update",
  ensure.admin,
  errorWrap(async (req, res) => {
    delete req.body.autograde;
    const updates = req.body;
    await Milestone.findByIdAndUpdate(req.params.milestone_id, updates);

    res.sendStatus(204);
  })
);

// deletes a specified milestone
// TODO VALIDATION LATER
router.delete(
  "/:milestone_id",
  ensure.admin,
  errorWrap(async (req, res) => {
    await Milestone.findByIdAndDelete(req.params.milestone_id);
    res.sendStatus(204);
  })
);

module.exports = router;
