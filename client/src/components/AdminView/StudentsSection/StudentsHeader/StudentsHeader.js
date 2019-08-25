import React from "react";
import SearchBar from "../../SearchBar";
import StudentsHeaderListButton from "./StudentsHeaderListButton";
import ActionButton from "./ActionButton";
import { ListOptions } from "../StudentsSection";

import "./../../AdminHeader.css";

class StudentsHeader extends React.Component {
  render() {
    const { setActiveList, selectedStudents, selectedTeams } = this.props;

    return (
      <div className="adminHeader-container bottomShadow">
        <h1 className="adminHeader-head">Students</h1>
        <div className="u-flex u-flexJustifyBetweeen u-flexAlignCenter">
          <div className="massAction-container">
            <div className="u-flex">
              <SearchBar onChange={(event) => this.props.getStudents(event.target.value)} />
              <ActionButton selectedStudents={selectedStudents} selectedTeams={selectedTeams} />
            </div>
            <div>{this.renderSelected()}</div>
          </div>
          <div className="u-flex">
            <StudentsHeaderListButton
              tabLabel={ListOptions.INDIVIDUAL}
              activeList={this.props.activeList}
              onClick={setActiveList}
            />
            <StudentsHeaderListButton
              tabLabel={ListOptions.TEAM}
              activeList={this.props.activeList}
              onClick={setActiveList}
            />
          </div>
        </div>
      </div>
    );
  }

  renderSelected = () => {
    if (this.props.activeList === ListOptions.INDIVIDUAL) {
      return (
        <div className="u-flex">
          {this.props.selectedStudents.map((student, index) => (
            <div key={`selected-${index}`}>
              <span>{student.first_name}</span>
              <button onClick={() => this.props.deselectStudent(student)}>X</button>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="u-flex">
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
