/** API interaction with GitHub **/

const fetch = require("node-fetch");
const util = require("./routes/util");

const BASE_URL = "https://api.github.com";
const ORG_NAME = "weblab-class";
const API_KEY = process.env.GITHUB_API_KEY;
const HEADERS = {
  "User-Agent": "cory2067",
  "Authorization": "token " + API_KEY,
};

function getEndpoint(path) {
  return `${BASE_URL}/${path}`;
}

// returns a promise for the GitHub ID of the created team
function createTeam(name) {
  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ name }),
  };

  return fetch(getEndpoint(`orgs/${ORG_NAME}/teams`), options).then(res => res.json()).then((res) => {
    console.log("got create team response: ", res)
    return { id: res.id, slug: res.slug };
  });
}

// returns a promise for the URL of the repo and final repo name
// the final repo name might differ from repoName, in order to resolve naming conflicts
function createRepo(teamId, repoName) {
  const options = {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      name: repoName,
      team_id: teamId,
      private: true,
    }),
  };
  const url = getEndpoint(`orgs/${ORG_NAME}/repos`);

  return fetch(url, options)
    .catch((err) =>
      util.get_active_year().then((year) => {
        options.body.name = `${options.body.name}-${year}`;
        console.log(`Retrying GitHub creation with name ${options.body.name}`);
        return fetch(url, options);
      })
    )
    .then((res) => {
      return { url: res.html_url, repoName: options.body.name };
    });
}

function giveAdminAccess(team_slug, repoName) {
  const options = {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify({
      permission: "admin",
    })
  };
  console.log("attempting give admin access: ", options)

  return fetch(getEndpoint(`orgs/${ORG_NAME}/teams/${team_slug}/repos/${ORG_NAME}/${repoName}`), options
  ).then(res => res.json());
}

function addMembers(teamId, usernames) {
  return Promise.all(
    usernames.map((username) => {
      const options = {
        method: "PUT",
        headers: HEADERS,
      };

      return fetch(getEndpoint(`teams/${teamId}/memberships/${username}`), options);
    })
  );
}

// TODO: test this since converting to node-fetch and since Github API major version change
// Not needed for any server operations at the moment
function deleteTeamAndRepo(teamId, repoName) {
  const options = {
    method: "DELETE",
    headers: HEADERS,
  };

  return Promise.all([fetch(getEndpoint(`teams/${teamId}`), options),
  fetch(getEndpoint(`repos/${ORG_NAME}/${repoName}`), options)]);
}

async function test() {
  const id = await createTeam("the meme team");
  console.log(`Created team with id ${id}`);
  const { url, repoName } = await createRepo(id, "cor-jynnie-aspiser");
  console.log(`Created new repo ${url}`);
  const res2 = await giveAdminAccess(id, repoName);
  console.log(`Granted team admin access to repo ${repoName}`);
  const res = await addMembers(id, ["cory2067"]);
  console.log("Added members to repo");

  await deleteTeamAndRepo(id, "cor-jynnie-aspiser");
  console.log("Cleaned up.");
}

module.exports = {
  // Generate a GitHub team and repo for the given team, return URL of repo
  generate: async (team) => {
    console.log(`Starting GitHub generation for ${team.team_name}`);
    const members = team.members.map((member) => member.github_username);
    const initialRepoName = members.join("-");

    const { id, slug } = await createTeam(team.team_name);
    const { url, repoName } = await createRepo(id, initialRepoName);
    console.log(`finished repo gen with url ${url} and name ${repoName}`);

    await giveAdminAccess(slug, repoName);
    console.log("gave admin access to repo");
    await addMembers(id, members);
    console.log(`Completed GitHub generation for ${team.team_name}`);

    return url;
  },
};
