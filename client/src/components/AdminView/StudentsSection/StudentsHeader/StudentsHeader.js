import React from "react";
import SearchBar from "../../SearchBar";
import StudentsHeaderListButton from "./StudentsHeaderListButton";
import ActionButton from "./ActionButton";
import { ListOptions } from "../StudentsSection";

class StudentsHeader extends React.Component {
  render() {
    const { setActiveList, selectedStudents, selectedTeams } = this.props;

    const styles = {
      marginLeft: "20px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    };

    return (
      <div>
        <h1 className="tabHeader">Students</h1>
        <div style={styles}>
          <div>
            {/* Make the below a FE filter, not a requery. */}
            <SearchBar
              onChange={(event) => this.props.getStudents(event.target.value)}
            />
            <ActionButton
              selectedStudents={selectedStudents}
              selectedTeams={selectedTeams}
            />
            <div>{this.renderSelected()}</div>
          </div>
          <div style={{ display: "flex" }}>
            <StudentsHeaderListButton
              tabLabel={ListOptions.INDIVIDUAL}
              onClick={setActiveList}
            />
            <StudentsHeaderListButton
              tabLabel={ListOptions.TEAM}
              onClick={setActiveList}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }

  renderSelected = () => {
    if (this.props.activeList === ListOptions.INDIVIDUAL) {
      return (
        <div style={{ display: "flex" }}>
          {this.props.selectedStudents.map((student, index) => (
            <div key={`selected-${index}`}>
              <span>{student.first_name}</span>
              <button onClick={() => this.props.deselectStudent(student)}>
                X
              </button>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div style={{ display: "flex" }}>
        {this.props.selectedTeams.map((team, index) => (
          <div key={`selected-${index}`}>
            <span>{team.team_name}</span>
            <button onClick={() => this.props.deselectTeam(team)}>X</button>
          </div>
        ))}
      </div>
    );
  };
}

export default StudentsHeader;
