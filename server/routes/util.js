const Class = require("../models/Class");
const Email = require("../models/Email");
const User = require("../models/User");
const Team = require("../models/Team");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function send_email(user_ids, team_ids, subject, body, sender) {
  const teams = await Team.find({ _id: { $in: team_ids } });
  const users = await User.find({ _id: { $in: user_ids } });
  const recipients = await User.find({
    $or: [
      {
        _id: {
          $in: teams.map((team) => team.members).reduce((a, b) => a.concat(b)),
        },
      },
      { _id: { $in: user_ids } },
    ],
  });
  const mailOptions = {
    from: process.env.GMAIL_USER,
    bcc: recipients.map(function(recipient) {
      return recipient.email;
    }),
    subject: subject,
    text: body,
  };
  const email = new Email({
    timestamp: Date.now(),
    subject: subject,
    body: body,
    from: sender.first_name + " " + sender.last_name,
    user_targets: users,
    team_targets: teams,
  });
  await email.save();
  transporter.sendMail(mailOptions, function(error, _) {
    if (error) {
      return error;
    } else {
      return email;
    }
  });
}

function query_active_year() {
  return Class.find({}).then((classes) => {
    for (let individual_class of classes) {
      if (individual_class.is_active) {
        return individual_class.year;
      }
    }
  });
}

/**
 * @param {Object} req express route (req) param.
 */
async function query_filter_year(req) {
  if (req.query.class_year) {
    return Number(req.query.class_year);
  } else {
    return await query_active_year();
  }
}

module.exports = {
  get_active_year: query_active_year,
  get_filter_year: query_filter_year,
  send_email,
};
