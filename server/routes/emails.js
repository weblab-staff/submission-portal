/* Defines all routes under /api/emails/ */

const express = require('express');
const connect = require("connect-ensure-login");
const router = express.Router();
const nodemailer = require('nodemailer');

const Email = require('../models/Email');
const Team = require('../models/Team');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  }
});

router.get("/", async (req, res) => {
  const emails = await Email.find({});
  res.send(emails);
});

router.post(
  '/',
  connect.ensureLoggedIn(),
  async (req, res) => {
    if (req.user.is_admin) {
      const teams = await Team.find({ _id: { $in: [req.body.teams] } });
      const users = await User.find({ _id: { $in: [req.body.students] } })
      const recipients = await User.find(
        {
          $or: [
            { _id: { $in: teams.map(function (team) { return team.members }).flat() } },
            { _id: { $in: [req.body.students] } }
          ]
        }
      );
      const mailOptions = {
        from: process.env.GMAIL_USER,
        bcc: recipients.map(function (recipient) { return recipient.email }),
        subject: req.body.subject,
        text: req.body.body,
      };
      const email = new Email({
        timestamp: Date.now(),
        subject: req.body.subject,
        body: req.body.body,
        from: req.user.first_name + ' ' + req.user.last_name,
        user_targets: users,
        team_targets: teams
      });
      await email.save()
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send({ error });
        } else {
          const response = 'Email sent: ' + info.response
          res.send({ response });
        }
      });
    } else {
      res.error('user is not an admin!');
    }
  });

module.exports = router;
