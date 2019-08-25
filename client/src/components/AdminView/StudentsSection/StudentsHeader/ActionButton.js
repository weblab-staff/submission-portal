import React from "react";
import { sendEmail } from "../../../../js/global";
import { createGithub, toggleCompete, removeTeam } from "../../../../js/teams";
import { addTag, removeTag, toggleCredit, dropStudents } from "../../../../js/students";

class Action {
  constructor(description, action, requiresInput) {
    this.description = description;
    this.action = action;
    this.input = requiresInput ? true : false;
  }

  getDescription() {
    return this.description;
  }

  needsInput() {
    return this.input;
  }

  apply(students, teams) {
    this.action(students, teams);
  }
}

class StudentAction extends Action {
  apply(students, _, input) {
    this.action(students, input);
  }
}

class TeamAction extends Action {
  apply(_, teams, input) {
    this.action(teams, input);
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
        new TeamAction("Remove Team", removeTeam),
      ],
      studentActions: [
        new StudentAction("Add Tag", addTag, true),
        new StudentAction("Remove Tag", removeTag, true),
        new StudentAction("Toggle Credit", toggleCredit),
        new StudentAction("Drop Students", dropStudents),
      ],
      selectedAction: null,
      inputVal: "",
    };
  }

  updateInputVal = (e) => {
    this.setState({ inputVal: e.target.value });
  };

  render() {
    const { selectedStudents, selectedTeams } = this.props;
    const availableActions = this.getAvailableActions();
    let { selectedAction, inputVal } = this.state;
    //ensure selected action is in available actions
    if (!availableActions.includes(availableActions[selectedAction])) {
      selectedAction = 0;
    }

    const activeAction = availableActions[selectedAction];

    return (
      <>
        {activeAction.needsInput() && (
          <input type="text" onChange={this.updateInputVal} value={inputVal} />
        )}
        <Dropdown actions={availableActions} updateSelectedAction={this.modifySelectedActions} />
        <ActButton
          action={activeAction}
          students={selectedStudents}
          teams={selectedTeams}
          input={inputVal}
        />
      </>
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

  modifySelectedActions = (index) => {
    this.setState({ selectedAction: index });
  };
}

const Dropdown = ({ actions, updateSelectedAction }) => (
  <select
    onChange={(e) => {
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

const ActButton = ({ action, students, teams, input }) => (
  <button
    disabled={
      (students.length == 0 && teams.length == 0) || (action.needsInput() && input.length == 0)
    }
    onClick={() => action.apply(students, teams, input)}
  >
    Go!
  </button>
);

export default ActionButton;
