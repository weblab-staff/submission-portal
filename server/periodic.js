/** Functions that run periodically **/

const GoogleSpreadsheet = require('google-spreadsheet');

const Team = require('./models/Team');
const Milestone = require('./models/Milestone');
const MilestoneSubmission = require('./models/MilestoneSubmission');

const SHEET_POLL_INTERVAL = 10;

function start() {
  setInterval(checkSubmissions, SHEET_POLL_INTERVAL * 1000);
}

async function checkSubmissions() {
  const milestones = await Milestone.find({year: 2019}); // TODO: get actual active year

  milestones
    .filter(milestone => milestone.autograde)
    .forEach(async milestone => {
      const sheet = await connectToSheet(milestone.responses_id);
      const rows = await getRows(sheet, milestone.submission_count + 1);

      console.log("New responses:", rows);
      rows.forEach(async row => {
        const team = await Team.findOne({team_name: row.teamname}, '_id');

        const submission = new MilestoneSubmission({
          team: team._id,
          timestamp: row.timestamp,
          milestone: milestone._id,
          form_response: row,
          feedback: []
        })

        submission.save();
      });


      milestone.submission_count += rows.length;
      milestone.save();
  });

}

function connectToSheet(sheetId) {
  const doc = new GoogleSpreadsheet(sheetId);
  const client_email = process.env.GOOGLE_SERVICE_ACCOUNT;
  const private_key = process.env.GOOGLE_PRIVATE_KEY;

  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth({client_email, private_key}, () => {
      doc.getInfo((err, info) => {
        if (err) return reject(err);
        console.log('Loaded doc: ' + info.title);
        resolve(doc.worksheets[0]);
      });
    });
  });
}

function getRows(sheet, offset=0) {
  const exclude = ["id", "app:edited", "save", "del"];

  return new Promise((resolve, reject) => {
    sheet.getRows({offset}, (err, rows) => {
      if (err) return reject(err);

      resolve(rows.map(row => {
        const output = {};
        Object.keys(row)
          .filter(key => !key.startsWith("_") && !exclude.includes(key))
          .forEach(key => output[sanitizeKey(key)] = row[key]);
        return output;
      }));

    });
  });
}

// delete characters from keys mongo doesn't like
function sanitizeKey(key) {
  return key.replace('.', '_');
}

module.exports = { start };
