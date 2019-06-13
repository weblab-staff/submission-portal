/* Defines all routes under /api/class/ */
const express = require('express');
const connect = require('connect-ensure-login');

const router = express.Router();
const Class = require('../models/Class');

// gets the information of the current class iteration
router.get("/", (req, res) => {
  console.log("getting class")
  Class.findOne({}).then(current_class => {
    console.log("found class", current_class)
    res.send(current_class);
  });
});

// gets the list of admins for the current class iteration
router.post(
  "/admins",
  connect.ensureLoggedIn(),
  function (req, res) {
    Class.update({}, { $set: { admins: req.body.admins } });
  });

// sets the current class year
router.post(
  "/active-year",
  connect.ensureLoggedIn(),
  function (req, res) {
    Class.update({}, { $set: { active_year: req.body.new_year } });
  });

// tries to claim initial admin access by matching the predetermined passphrase
router.post(
  "/create",
  // connect.ensureLoggedIn(),
  function (req, res) {
    Class.findOne({})
      .then(current_class => {
        console.log("current class ", current_class)
        if (current_class != null) {
          console.log("asdkfqejkrf")
          throw new Error('admins already have been established');
        } else {
          const passphrase = req.body.passphrase;
          if (process.env.ADMIN_PASSPHRASE != passphrase) {
            console.log("pqweoroqwer")
            throw new Error('invalid credential');
          } else {
            const newClass = new Class({
              'admins': [req.user],
              'active-year': req.body.new_year,
            });
            newClass.save();
            res.send(newClass);
          }
        }
      })
      .catch(error => {
        throw error;
      });
  });

module.exports = router;
