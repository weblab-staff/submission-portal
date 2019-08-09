/* Defines all routes under /api/class/ */
const express = require("express");

const router = express.Router();
const Class = require("../models/Class");
const utils = require("./util");
const ensure = require("./ensure");
const User = require("../models/User");
const errorWrap = require("./errorWrap");

// gets the information of the current class iteration
router.get(
  "/",
  ensure.admin,
  errorWrap(async (req, res) => {
    const filter = req.query["complete"] === "true" ? {} : { year: req.year };
    res.send(await Class.find(filter));
  })
);

// adds an admin to the list of admins
router.post(
  "/:class_id/admins",
  ensure.admin,
  errorWrap(async (req, res) => {
    const indiv_class = await Class.findByIdAndUpdate(req.params["class_id"], {
      $addToSet: { admins: req.body.admin_github_username }
    });

    await User.updateOne(
      {
        year: indiv_class.year,
        github_username: req.body.admin_github_username
      },
      { is_admin: true }
    );

    res.sendStatus(204);
  })
);

// removes an admin from the list of admins
router.delete(
  "/:class_id/admins",
  ensure.admin,
  errorWrap(async (req, res) => {
    const indiv_class = await Class.findByIdAndUpdate(req.params["class_id"], {
      $pull: { admins: req.body.admin_github_username }
    });

    await User.updateOne(
      {
        year: indiv_class.year,
        github_username: req.body.admin_github_username
      },
      { is_admin: false }
    );
    res.sendStatus(204);
  })
);

// changes the active year for a class
// should make sure only one other class is active
router.post(
  "/:class_id/set-active-year",
  ensure.admin,
  errorWrap(async (req, res) => {
    await Class.updateMany({ is_active: true }, { is_active: false });
    await Class.findByIdAndUpdate(req.params["class_id"], {
      is_active: true
    });

    res.sendStatus(204);
  })
);

// sets team_size_cap
router.post(
  "/:class_id/team_size_cap",
  ensure.admin,
  errorWrap(async (req, res) => {
    await Class.findByIdAndUpdate(req.params["class_id"], {
      team_size_cap: req.body.team_size_cap
    });

    res.sendStatus(204);
  })
);

// sets whether registration is open
router.post(
  "/:class_id/registration",
  ensure.admin,
  errorWrap(async (req, res) => {
    await Class.findByIdAndUpdate(req.params["class_id"], {
      registration_open: req.body.registration_open
    });

    return res.sendStatus(204);
  })
);

//create a class
//VALIDATE THAT NO OTHER CLASS HAS THE SAME YEAR!
router.post(
  "/",
  ensure.admin,
  errorWrap(async (req, res) => {
    const existing = await Class.findOne({ year: req.body["year"] });
    if (existing) {
      console.log("attempting to make a class with duplicate year");
      res.sendStatus(400);
    } else {
      const newClass = new Class({
        year: req.body["year"],
        team_size_cap: req.body["team_size_cap"],
        admins: req.body["admins"],
        is_active: false
      });

      await newClass.save();
      await User.updateMany(
        {
          year: req.body.year,
          github_username: { $in: req.body.admins }
        },
        { is_admin: true }
      );

      return res.send(newClass);
    }
  })
);

module.exports = router;
