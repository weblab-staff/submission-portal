import { post } from "../utils";

export const sendEmail = (students, teams) => {
  const studentIds = students.map((student) => student._id);
  const teamIds = teams.map((team) => team._id);
  post(`api/emails/`, {
    students: studentIds,
    teams: teamIds,
  })
    .then((res) => {
      window.open(res.mailto, "_blank");
      alert("success!");
    })
    .catch((err) => console.log(err));
};
