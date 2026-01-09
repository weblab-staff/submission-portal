import { post, delet } from "../utils";
import socketIOClient from "socket.io-client";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);

export const createGithub = (teamObjs) => {
  Promise.all(
    teamObjs.map((teamObj) => post(`/api/teams/${teamObj._id}/generate-github`, {}))
  ).then(alert("generated github"));
};

export const toggleCompete = (teamObjs) => {
  Promise.all(
    teamObjs.map((teamObj) =>
      post(`/api/teams/${teamObj._id}/set-competing`, {
        competing: !teamObj.competing,
      })
    )
  ).then(alert("toggled competing"));
};

export const removeTeam = (teams) => {
  Promise.all(teams.map((team) => delet(`/api/teams/${team._id}`))).then(alert("removed teams"));
};

export const hasSubmission = (teamObj, milestoneId) => {
  return !!teamObj.submissions[milestoneId] && teamObj.submissions[milestoneId].length > 0;
};

export const addMember = (teamId, userId) => {
  return post(`api/teams/${teamId}`, { user_id: userId });
};

export const removeMember = (teamId, userId) => {
  delet(`/api/teams/${teamId}/remove-member`, { user_id: userId, team_id: teamId })
    .then((status) => {
      if (status === 204) {
        console.log("successfully removed from team");
        window.location.reload();
      } else {
        console.log("failed to remove student from team");
      }
    })
    .catch((err) => console.log(err));
};

export const manualCredit = async (teamObj, milestoneObj) => {
  await post(`/api/teams/${teamObj._id}/mark-complete`, {
    milestone_id: milestoneObj._id,
  })
    .then((res) => {
      // alert("refresh to see");
    })
    .catch((err) => console.log(err));
};

export const removeCredit = async (teamObj, milestoneObj) => {
  await post(`/api/teams/${teamObj._id}/mark-incomplete`, {
    milestone_id: milestoneObj._id,
  })
    .then((res) => {
      // alert("refresh to see");
    })
    .catch((err) => console.log(err));
};
