import { post, delet } from "../utils";
import socketIOClient from "socket.io-client";
const endpoint = "localhost:3000"
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
  socket.emit('join_team', {
    team_id: teamId,
    user_id: userId,
  })
};

export const removeMember = (teamId, userId) => {
  socket.emit('leave_team', {
    team_id: teamId,
    user_id: userId,
  })
};
