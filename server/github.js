/** API interaction with GitHub **/

const request = require('request-promise-native');

const BASE_URL = 'https://api.github.com';
const API_KEY = process.env.GITHUB_API_KEY;
const HEADERS = {
  'User-Agent': 'cory2067'
}

function getEndpoint(path) {
 return `${BASE_URL}/${path}?access_token=${API_KEY}`; 
}

// returns a promise for the GitHub ID of the created team
function createTeam(name) {
  const options = {
    method: 'POST',
    uri: getEndpoint('orgs/mit6148/teams'),
    headers: HEADERS,
    body: { name },
    json: true
  };

  return request(options).then(res => res.id);
}

// returns a promise for the URL of the repo
function createRepo(name, team_id) {
  const options = {
    method: 'POST',
    uri: getEndpoint('orgs/mit6148/repos'),
    headers: HEADERS,
    body: { 
      name,
      team_id,
      private: true,
    },
    json: true
  };

  return request(options).then(res => res.html_url);
}

async function main() {
  const id = await createTeam("the meme team");
  const res = await createRepo('cor-jynnie-aspiser', id);
  console.log(res);
}

// main()
