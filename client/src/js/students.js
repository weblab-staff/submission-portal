import { post, delet } from "../utils";

export const isRegistered = (user) => {
  return (
    user.first_name !== undefined &&
    user.last_name !== undefined &&
    user.email !== undefined &&
    user.for_credit !== undefined
  );
};

export const removeTag = (studentObjs, deleteTag) => {
  Promise.all(
    studentObjs.map((studentObj) =>
      post(`/api/users/${studentObj._id}/update`, {
        tags: studentObj.tags.filter((tag) => tag !== deleteTag),
      })
    )
  ).then(alert("removed tag"));
};

export const addTag = (studentObjs, tag) => {
  Promise.all(
    studentObjs
      .filter((studentObj) => !studentObj.tags.includes(tag))
      .map((studentObj) =>
        post(`/api/users/${studentObj._id}/update`, {
          tags: studentObj.tags.concat(tag),
        })
      )
  ).then(alert("added tag please refresh"));
};

export const assignTeam = (studentObjs) => {
  //call to teams join team
  alert("assign team");
};

export const dropStudents = (studentObjs) => {
  //todo github-esque type confirm to delete

  if (
    confirm(
      `Are you sure you want to drop ${JSON.stringify(
        studentObjs.map((studentObj) => studentObj.first_name)
      )}?`
    )
  ) {
    Promise.all(studentObjs.map((studentObj) => delet(`/api/users/${studentObj._id}`))).then(
      alert("deleted students -- please refresh")
    );
  }
};

export const toggleCredit = (studentObjs) => {
  Promise.all(
    studentObjs.map((studentObj) =>
      post(`/api/users/${studentObj._id}/update`, {
        for_credit: !studentObj.for_credit,
      })
    )
  ).then(alert("toggled credit"));
};
