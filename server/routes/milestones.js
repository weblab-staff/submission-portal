/* Defines all routes under /api/milestones/ */

const express = require("express");
const connect = require("connect-ensure-login");

const router = express.Router();
const Milestone = require("../models/Milestone");
const Class = require("../models/Class");
const utils = require("./util.js");
// gets the list of milestones for the current class year
router.get("/", async (req, res) => {
  let year_filter = { year: await utils.get_filter_year(req) };
  Milestone.find(year_filter).then(milestones => {
    res.send(milestones);
  });
});

router.get("/:milestone_id", async (req, res) => {
  res.send(await Milestone.findById(req.params.milestone_id));
});

// creates a new milestone for the current class year
// TODO VALIDATION LATER
router.post(
  "/",
  // connect.ensureLoggedIn(),
  async (req, res) => {
    // if (req.user.is_admin) {
    const active_year = await utils.get_active_year();
    const new_milestone = new Milestone({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      handin_link: req.body.handin_link,
      responses_link: req.body.responses_link,
      autograde: false,
      submission_closed: false,
      submission_count: 0,
      year: active_year
    });
    new_milestone.save().then(m => {
      return res.send(m);
    });
    // } else {
    //   res.error("user is not an admin!");
    // }
  }
);

// sets the autograde status of a specific milestone
// TODO VALIDATION LATER
router.post(
  "/:milestone_id/set-autograde",
  // connect.ensureLoggedIn(),
  function(req, res) {
    // if (req.user.is_admin) {
    Milestone.findByIdAndUpdate(req.params["milestone_id"], {
      autograde: req.body.autograde // TODO VALIDATION
    }).then(() => {
      res.sendStatus(204);
    });
    // } else {
    //   res.error("user is not an admin!");
    // }
  }
);

// updates a milestone, cannot use to update autograde status as that requires validation
// TODO VALIDATION LATER
router.post(
  "/:milestone_id/update",
  // connect.ensureLoggedIn(),
  function(req, res) {
    // if (req.user.is_admin) {
    delete req.body.autograde;
    const updates = req.body;
    Milestone.findByIdAndUpdate(req.params["milestone_id"], updates).then(
      () => {
        res.sendStatus(204);
      }
    );
    // } else {
    //   res.error("user is not an admin!");
    // }
  }
);

// deletes a specified milestone
// TODO VALIDATION LATER
router.delete(
  "/:milestone_id",
  // connect.ensureLoggedIn(),
  function(req, res) {
    // if (req.user.is_admin) {
    Milestone.findByIdAndDelete(req.params["milestone_id"]).then(() => {
      res.sendStatus(204);
    });
    // } else {
    //   res.error("user is not an admin!");
    // }
  }
);

module.exports = router;
