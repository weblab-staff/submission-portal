/** Functions that run periodically **/

const GoogleSpreadsheet = require('google-spreadsheet');

const SHEET_POLL_INTERVAL = 5;

function start() {
  setInterval(checkSubmissions, SHEET_POLL_INTERVAL * 1000);
}

async function checkSubmissions() {
  const sheet = await connectToSheet('189xLdHXbNRUzsZ14-qprHD5O-3G0gdju9CFCUr-19rs');
  const rows = await getRows(sheet);

  console.log(rows);
  console.log(rows.length);
}

function connectToSheet(sheetId) {
  const doc = new GoogleSpreadsheet('189xLdHXbNRUzsZ14-qprHD5O-3G0gdju9CFCUr-19rs');
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
          .forEach(key => output[key] = row[key]);
        return output;
      }));

    });
  });
}

module.exports = { start };
