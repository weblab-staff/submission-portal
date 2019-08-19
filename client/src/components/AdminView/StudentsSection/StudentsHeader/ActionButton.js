import React from "react";
import { sendEmail } from "../../../../js/global";
import { createGithub, toggleCompete, removeTeam } from "../../../../js/teams";
import {
  addTag,
  removeTag,
  toggleCredit,
  dropStudents
} from "../../../../js/students";

class Action {
  constructor(description, action) {
    this.description = description;
    this.action = action;
  }

  getDescription() {
    return this.description;
  }

  apply(students, teams) {
    this.action(students, teams);
  }
}

class StudentAction extends Action {
  apply(students, teams) {
    this.action(students);
  }
}

class TeamAction extends Action {
  apply(students, teams) {
    this.action(teams);
  }
}

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalActions: [new Action("Send Email", sendEmail)],
      teamActions: [
        new TeamAction("Create Github", createGithub),
        new TeamAction("Toggle Compete", toggleCompete),
        new TeamAction("Remove Team", removeTeam)
      ],
      studentActions: [
        new StudentAction("Add Tag", addTag),
        new StudentAction("Remove Tag", removeTag),
        new StudentAction("Toggle Credit", toggleCredit),
        new StudentAction("Drop Students", dropStudents)
      ],
      selectedAction: null
    };
  }

  render() {
    const { selectedStudents, selectedTeams } = this.props;
    const availableActions = this.getAvailableActions();
    let { selectedAction } = this.state;
    console.log(availableActions, availableActions[0].description);
    //ensure selected action is in available actions
    if (!availableActions.includes(availableActions[selectedAction])) {
      selectedAction = 0;
    }

    return (
      <div>
        <ActButton
          action={availableActions[selectedAction]}
          students={selectedStudents}
          teams={selectedTeams}
        />
        <Dropdown
          actions={availableActions}
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

  modifySelectedActions = index => {
    this.setState({ selectedAction: index });
  };
}

const Dropdown = ({ actions, updateSelectedAction }) => (
  <select
    onChange={e => {
      const index = e.target.value;
      updateSelectedAction(index);
    }}
  >
    {actions.map((action, index) => {
      return (
        <option value={index} key={index}>
          {action.getDescription()}
        </option>
      );
    })}
  </select>
);

const ActButton = ({ action, students, teams }) => (
  <button
    disabled={students.length == 0 && teams.length == 0}
    onClick={() => action.apply(students, teams)}
  >
    X
  </button>
);

export default ActionButton;
