import { post, delet } from "../utils";
import socketIOClient from "socket.io-client";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);

export const createGithub = (teams) => {
  Promise.all(teams.map((team) => post(`/api/teams/${team._id}/generate-github`, {}))).then(
    alert("generated github")
  );
};

export const toggleCompete = (teams) => {
  Promise.all(
    teams.map((team) =>
      post(`/api/teams/${team._id}/set-competing`, {
        competing: !team.competing,
      })
    )
  ).then(alert("toggled competing"));
};

export const removeTeam = (teams) => {
  Promise.all(teams.map((team) => delet(`/api/teams/${team._id}`))).then(alert("removed teams"));
};

export const hasSubmission = (team, milestoneId) => {
  console.log(team)
  return !!team.submissions[milestoneId] && team.submissions[milestoneId].length > 0;
};

export const addMember = (teamId, userId) => {
  post(`api/teams/${teamId}`, { user_id: userId }).then(console.log(`joined team ${teamId}`));
};

export const removeMember = (teamId, userId) => {
   delet(`/api/teams/${teamId}/remove-member`, { user_id: userId, team_id: teamId })
    .then((status) => {
      if (status === 204) {
        alert("removed team member, plx refresh page");
      } else {
        console.log("failed to remove student from team");
      }
    })
    .catch((err) => console.log(err));
};
