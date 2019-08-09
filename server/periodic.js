/** Functions that run periodically **/

const GoogleSpreadsheet = require("google-spreadsheet");

const Team = require("./models/Team");
const Milestone = require("./models/Milestone");
const MilestoneSubmission = require("./models/MilestoneSubmission");
const util = require("./routes/util");

const SHEET_POLL_INTERVAL = 10;

function start() {
  if (process.env.NODE_ENV === "test") return;
  setInterval(checkSubmissions, SHEET_POLL_INTERVAL * 1000);
}

async function checkSubmissions() {
  const year = await util.get_active_year();
  const milestones = await Milestone.find({ year }); // TODO: get actual active year

  milestones
    .filter(milestone => milestone.autograde)
    .forEach(async milestone => {
      const sheet = await connectToSheet(milestone.responses_id);
      const rows = await getRows(sheet, milestone.submission_count + 1);
      if (!rows.length) return;

      console.log("New responses:", rows);
      rows.forEach(async (row, i) => {
        const rowIndex = milestone.submission_count + i + 1;
        const team = await Team.findOne({ team_name: row.teamname });
        if (!team) {
          return console.log("ERROR: Submission with invalid team name");
        }

        const submission = new MilestoneSubmission({
          team: team._id,
          timestamp: row.timestamp,
          milestone: milestone._id,
          form_response: row,
          feedback: [],
          key: `${milestone._id}:${rowIndex}` // assert unique, to prevent duplicate submissions
        });

        // update submission and team atomically (prevents weird state in case of failure)
        const session = await MilestoneSubmission.startSession();
        try {
          await session.withTransaction(async () => {
            await submission.save({ session });
            await team.updateOne(
              { $push: { submissions: submission } },
              { session }
            );
          });
        } catch (e) {
          if (e.name === "ValidationError") {
            console.log(`Ignoring duplicate submission from ${row.teamname}`);
            return;
          }

          console.log(e);
          console.log(`ERROR: Submission from ${row.teamname} failed to save`);
        }
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
    doc.useServiceAccountAuth({ client_email, private_key }, () => {
      doc.getInfo((err, info) => {
        if (err) return reject(err);
        resolve(doc.worksheets[0]);
      });
    });
  });
}

function getRows(sheet, offset = 0) {
  const exclude = ["id", "app:edited", "save", "del"];

  return new Promise((resolve, reject) => {
    sheet.getRows({ offset }, (err, rows) => {
      if (err) return reject(err);

      resolve(
        rows.map(row => {
          const output = {};
          Object.keys(row)
            .filter(key => !key.startsWith("_") && !exclude.includes(key))
            .forEach(key => (output[sanitizeKey(key)] = row[key]));
          return output;
        })
      );
    });
  });
}

// delete characters from keys mongo doesn't like
function sanitizeKey(key) {
  return key.replace(".", "_");
}

module.exports = { start };
