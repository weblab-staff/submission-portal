/* Defines all routes under /api/milestones/ */

const express = require('express');
const connect = require('connect-ensure-login');

const router = express.Router();
const Milestone = require('../models/Milestone');
const Class = require('../models/Class');

function get_active_year() {
  Class.findOne({}).then(current_class => {
    return current_class.active_year;
  })
}

// gets the list of milestones for the current class year
router.get('/', (req, res) => {
  const active_year = get_active_year();
  Milestone.find({ 'year': active_year }).then(milestones => {
    res.send(milestones);
  });
});

// creates a new milestone for the current class year
router.post(
  '/',
  // connect.ensureLoggedIn(),
  function (req, res) {
    // if (req.user.is_admin) {
    if (true) {
      const active_year = get_active_year();
      const new_milestone = new Milestone({
        'title': req.body.title,
        'description': req.body.description,
        'deadline': req.body.deadline,
        'handin_link': req.body.handin_link,
        'responses_link': req.body.responses_link,
        'autograde': false,
        'submission_closed': false,
        'year': active_year,
      });
      new_milestone.save();
    } else {
      res.error('user is not an admin!');
    }
  });

// sets the autograde status of a specific milestone
router.post(
  '/:milestone_id/set-autograde',
  // connect.ensureLoggedIn(),
  function (req, res) {
    if (req.user.is_admin) {
      Milestone.update(
        { _id: req.query.milestone_id },
        { $set: { autograde: req.body.autograde } }
      );
    } else {
      res.error('user is not an admin!');
    }
  });

// deletes a specified milestone
router.delete(
  '/:milestone_id',
  // connect.ensureLoggedIn(),
  function (req, res) {
    if (req.user.is_admin) {
      Milestone.remove(
        { _id: req.query.milestone_id },
      );
    } else {
      res.error('user is not an admin!');
    }
  });

module.exports = router;
