/* Defines all routes under /api/emails/ */

const express = require("express");
const connect = require("connect-ensure-login");
const router = express.Router();
const utils = require("./util.js");

router.post("/", connect.ensureLoggedIn(), async (req, res) => {
  if (req.user.is_admin) {
    const user_ids = req.body.students !== undefined ? req.body.students : [];
    const team_ids = req.body.teams !== undefined ? req.body.teams : [];
    res.send(await utils.send_email(user_ids, team_ids, req.body.subject, req.body.body, req.user));
  } else {
    res.error("user is not an admin!");
  }
});

module.exports = router;
