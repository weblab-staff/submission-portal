import React from "react";
import { post, delet } from "../../../../utils";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalActions: [["Send Email", this.sendEmail]],
      teamActions: [
        ["Create Github", this.createGithub],
        ["Toggle Compete", this.toggleCompete],
        ["Remove Team", this.removeTeam]
      ],
      studentActions: [
        ["Add Tag", this.addTag],
        ["Remove Tag", this.removeTag],
        ["Toggle Credit", this.toggleCredit],
        ["Assign Team", this.assignTeam],
        ["Drop Students", this.dropStudents]
      ],
      selectedAction: null
    };
  }

  render() {
    const { selectedStudents, selectedTeams } = this.props;
    const availableActions = this.getAvailableActions();
    let { selectedAction } = this.state;

    //ensure selected action is in available actions
    if (!availableActions.includes(availableActions[selectedAction])) {
      selectedAction = 0;
    }

    return (
      <div>
        <Action
          action={availableActions[selectedAction]}
          students={selectedStudents}
          teams={selectedTeams}
        />
        <Dropdown
          actionDescriptions={availableActions.map(action => action[0])}
          updateSelectedAction={this.modifySelectedActions}
        />
      </div>
    );
  }

  getAvailableActions = () => {
    const { selectedStudents, selectedTeams } = this.props;
    const { globalActions, studentActions, teamActions } = this.state;
    if (
      (selectedStudents.length == 0 && selectedTeams.length == 0) ||
      (selectedStudents.length != 0 && selectedTeams.length != 0)
    ) {
      return globalActions;
    } else if (selectedStudents.length != 0) {
      return globalActions.concat(studentActions);
    } else {
      return globalActions.concat(teamActions);
    }
  };

  sendEmail = (students, teams) => {
    alert("email");
  };

  createGithub = (students, teams) => {
    alert("github");
  };

  toggleCompete = (students, teams) => {
    alert("toggle compete");
  };

  removeTeam = (students, teams) => {
    alert("remove team");
  };

  removeTag = (students, teams) => {
    //todo popup asking for tag
    const deleteTag = "test"; // todo replace me
    Promise.all(
      students.map(student =>
        post(`/api/users/${student._id}/update`, {
          tags: student.tags.filter(tag => tag !== deleteTag)
        })
      )
    ).then(alert("removed tag"));
  };

  addTag = (students, teams) => {
    //todo popup asking for tag
    const tag = "test";
    Promise.all(
      students
        .filter(student => !student.tags.includes(tag))
        .map(student =>
          post(`/api/users/${student._id}/update`, {
            tags: student.tags.concat(tag)
          })
        )
    ).then(alert("added tag"));
  };

  assignTeam = (students, teams) => {
    //todo modal
    alert("assign team");
  };

  dropStudents = (students, teams) => {
    //todo github-esque type confirm to delete
    Promise.all(
      students.map(student => delet(`/api/users/${student._id}`))
    ).then(alert("deleted students"));
  };

  toggleCredit = (students, teams) => {
    Promise.all(
      students.map(student =>
        post(`/api/users/${student._id}/update`, {
          for_credit: !student.for_credit
        })
      )
    ).then(alert("toggled credit"));
  };

  modifySelectedActions = index => {
    this.setState({ selectedAction: index });
  };
}

const Dropdown = ({ actionDescriptions, updateSelectedAction }) => (
  <select
    onChange={e => {
      const index = e.target.value;
      updateSelectedAction(index);
    }}
  >
    {actionDescriptions.map((actionDescription, index) => {
      return (
        <option value={index} key={index}>
          {actionDescription}
        </option>
      );
    })}
  </select>
);

const Action = ({ action, students, teams }) => (
  <button
    disabled={students.length == 0 && teams.length == 0}
    onClick={() => action[1](students, teams)}
  >
    {action[0]}
  </button>
);

export default ActionButton;
