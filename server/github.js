/** API interaction with GitHub **/

const request = require("request-promise-native");

const BASE_URL = "https://api.github.com";
const API_KEY = process.env.GITHUB_API_KEY;
const HEADERS = {
  "User-Agent": "cory2067",
};

function getEndpoint(path) {
  return `${BASE_URL}/${path}?access_token=${API_KEY}`;
}

// returns a promise for the GitHub ID of the created team
function createTeam(name) {
  const options = {
    method: "POST",
    uri: getEndpoint("orgs/mit6148/teams"),
    headers: HEADERS,
    body: { name },
    json: true,
  };

  return request(options).then((res) => res.id);
}

// returns a promise for the URL of the repo
function createRepo(teamId, repoName) {
  const options = {
    method: "POST",
    uri: getEndpoint("orgs/mit6148/repos"),
    headers: HEADERS,
    body: {
      name: repoName,
      team_id: teamId,
      private: true,
    },
    json: true,
  };

  return request(options).then((res) => res.html_url);
}

function giveAdminAccess(teamId, repoName) {
  const options = {
    method: "PUT",
    uri: getEndpoint(`teams/${teamId}/repos/mit6148/${repoName}`),
    headers: HEADERS,
    body: {
      permission: "admin",
    },
    json: true,
  };

  return request(options);
}

function addMembers(teamId, usernames) {
  return Promise.all(
    usernames.map((username) => {
      const options = {
        method: "PUT",
        uri: getEndpoint(`teams/${teamId}/memberships/${username}`),
        headers: HEADERS,
        json: true,
      };

      return request(options);
    })
  );
}

function deleteTeamAndRepo(teamId, repoName) {
  const teamOptions = {
    method: "DELETE",
    uri: getEndpoint(`teams/${teamId}`),
    headers: HEADERS,
  };

  const repoOptions = {
    method: "DELETE",
    uri: getEndpoint(`repos/mit6148/${repoName}`),
    headers: HEADERS,
  };

  return Promise.all([request(teamOptions), request(repoOptions)]);
}

async function test() {
  const id = await createTeam("the meme team");
  console.log(`Created team with id ${id}`);
  const url = await createRepo(id, "cor-jynnie-aspiser");
  console.log(`Created new repo ${url}`);
  const res2 = await giveAdminAccess(id, "cor-jynnie-aspiser");
  console.log("Granted team admin access to repo");
  const res = await addMembers(id, ["cory2067"]);
  console.log("Added members to repo");

  await deleteTeamAndRepo(id, "cor-jynnie-aspiser");
  console.log("Cleaned up.");
}

module.exports = {
  // Generate a GitHub team and repo for the given team, return URL of repo
  generate: async (team) => {
    const members = team.members.map((member) => member.github_username);
    const repoName = members.join("-");

    const id = await createTeam(team.team_name);
    const url = await createRepo(id, repoName);

    await giveAdminAccess(id, repoName);
    await addMembers(id, members);

    return url;
  },
};
