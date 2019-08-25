/* Defines all routes under /api/emails/ */

const express = require("express");
const router = express.Router();
const utils = require("./util");
const ensure = require("./ensure");
const errorWrap = require("./errorWrap");

router.post(
  "/",
  ensure.admin,
  errorWrap(async (req, res) => {
    const user_ids = req.body.students || [];
    const team_ids = req.body.teams || [];
    res.send(await utils.send_email(user_ids, team_ids, req.body.subject, req.body.body, req.user));
  })
);

module.exports = router;
