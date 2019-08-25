import { post, delet } from "../utils";

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
  return !!team.submissions[milestoneId] && team.submissions[milestoneId].length > 0;
};

export const addMember = (team, user) => {
  console.log(`TODO: This isn't implemeneted${user}`);
};

export const removeMember = (team, user) => {
  delet(`/api/teams/${team._id}/remove-member`, { user_id: user._id })
    .then((status) => {
      if (status === 204) {
        alert("removed team member, plx refresh page");
      } else {
        console.log("failed to remove student from team");
      }
    })
    .catch((err) => console.log(err));
};
