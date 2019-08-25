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
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, _) {
      if (error) {
        reject(error);
      } else {
        resolve(email);
      }
    });
  });
}

function query_active_year() {
  return Class.findOne({ is_active: true }).then((cls) => cls && cls.year);
}

function filterOnWord(obj, word, fields) {
  lw = words[i].toLowerCase();
  for (k in fields) {
    let field = fields[k];
    // check tags first
    if (field === "tags") {
      word_passed = false;
      obj[field].forEach(function(item, index) {
        if (item.toLowerCase().includes(lw) && lw) {
          word_passed = true;
        }
      });
      if (word_passed) {
        return true;
      }
    } else if (obj[field] && typeof obj[field] === "string") {
      if (obj[field].toLowerCase().includes(lw) && lw) {
        return true;
      }
    }
  }
  return false;
}

function searchFilter(objs, query, fields = []) {
  return objs.filter((s) => {
    words = query.split(" ");
    for (i in words) {
      if (!filterOnWord(s, words[i].toLowerCase(), fields)) {
        return false;
      }
    }
    return true;
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
  searchFilter,
};
