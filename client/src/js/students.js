import { post, delet } from "../utils";

export const isRegistered = user => {
  return (
    user.first_name !== undefined &&
    user.last_name !== undefined &&
    user.email !== undefined &&
    user.for_credit !== undefined
  );
};

export const removeTag = (students, deleteTag) => {
  //todo popup asking for tag
  if (!deleteTag) {
    deleteTag = "test"; // todo replace me
  }
  Promise.all(
    students.map(student =>
      post(`/api/users/${student._id}/update`, {
        tags: student.tags.filter(tag => tag !== deleteTag)
      })
    )
  ).then(alert("removed tag"));
};

export const addTag = (students, tag) => {
  //todo popup asking for tag
  if (!tag) {
    tag = "test"; //if tag not supplied prompt for tag
  }
  Promise.all(
    students
      .filter(student => !student.tags.includes(tag))
      .map(student =>
        post(`/api/users/${student._id}/update`, {
          tags: student.tags.concat(tag)
        })
      )
  ).then(alert("added tag please refresh"));
};

export const assignTeam = students => {
  //todo modal
  alert("assign team");
};

export const dropStudents = students => {
  //todo github-esque type confirm to delete

  if (
    confirm(
      `Are you sure you want to drop ${JSON.stringify(
        students.map(student => student.first_name)
      )}?`
    )
  ) {
    Promise.all(
      students.map(student => delet(`/api/users/${student._id}`))
    ).then(alert("deleted students -- please refresh"));
  }
};

export const toggleCredit = students => {
  Promise.all(
    students.map(student =>
      post(`/api/users/${student._id}/update`, {
        for_credit: !student.for_credit
      })
    )
  ).then(alert("toggled credit"));
};
