/* Defines all routes under /api/class/ */
const express = require("express");
const connect = require("connect-ensure-login");

const router = express.Router();
const Class = require("../models/Class");
const utils = require("./util");
const User = require("../models/User");

// gets the information of the current class iteration
router.get("/", async (req, res) => {
  const filter_year = await utils.get_filter_year(req);
  const filter = req.query["complete"] === "true" ? {} : { year: filter_year };
  Class.find(filter).then(data => {
    res.send(data);
  });
});

// adds an admin to the list of admins
router.post("/:class_id/admins", function(req, res) {
  Class.findByIdAndUpdate(req.params["class_id"], {
    $addToSet: { admins: req.body.admin_github_username }
  }).then(indiv_class => {
    User.update(
      {
        year: indiv_class.year,
        github_username: req.body.admin_github_username
      },
      { is_admin: true }
    ).then(() => {
      res.sendStatus(204);
    });
  });
});

// removes an admin from the list of admins
router.delete("/:class_id/admins", function(req, res) {
  Class.findByIdAndUpdate(req.params["class_id"], {
    $pull: { admins: req.body.admin_github_username }
  }).then(indiv_class => {
    User.updateOne(
      {
        year: indiv_class.year,
        github_username: req.body.admin_github_username
      },
      { is_admin: false }
    ).then(() => {
      res.sendStatus(204);
    });
  });
});

// changes the active year for a class
// should make sure only one other class is active
router.post("/:class_id/active-year", (req, res) => {
  Class.update({ is_active: true }, { is_active: false }).then(() => {
    Class.findByIdAndUpdate(req.params["class_id"], {
      is_active: true
    }).then(() => {
      res.sendStatus(204);
    });
  });
});

//create a class
//VALIDATE THAT NO OTHER CLASS HAS THE SAME YEAR!
router.post(
  "/",
  // connect.ensureLoggedIn(),
  async (req, res) => {
    const existing = await Class.findOne({ year: req.body["year"] });
    if (existing && existing.length > 0) {
      console.log("attempting to make a class with duplicate year");
      res.sendStatus(400);
    } else {
      Class.create({
        year: req.body["year"],
        team_size_cap: req.body["team_size_cap"],
        admins: req.body["admins"],
        is_active: false
      }).then(() => {
        res.sendStatus(204);
      });
    }
  }
);

module.exports = router;
