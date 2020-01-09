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
    const subject = req.body.subject || "";
    const body = req.body.body || "";
    const { mailto } = await utils.save_email(user_ids, team_ids, subject, body, req.user);
    res.send({ mailto });
  })
);

module.exports = router;
