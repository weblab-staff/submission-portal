import React from "react";
import SortableHeader from "../SortableHeader";
import { ListOptions } from "../StudentsSection";

class StudentListHeader extends React.Component {
  areStudentsSelected = () => {
    return this.props.selectedStudents.length > 0;
  };

  toggleSelect = () => {
    if (this.areStudentsSelected()) {
      this.props.deselectAll();
    } else {
      this.props.selectAll();
    }
  };

  render() {
    return (
      <div className="studentEntry-header">
        <div>
          <input
            type="checkbox"
            checked={this.areStudentsSelected()}
            onChange={this.toggleSelect}
          />
        </div>
        <SortableHeader
          label="First Name"
          items={this.props.students}
          sortingFn={(a, b) => a.first_name.localeCompare(b.first_name)}
          handleSort={this.props.handleSort}
        />
        <SortableHeader
          label="Last Name"
          items={this.props.students}
          sortingFn={(a, b) => a.last_name.localeCompare(b.last_name)}
          handleSort={this.props.handleSort}
        />
        <SortableHeader
          label="Github"
          items={this.props.students}
          sortingFn={(a, b) =>
            a.github_username.localeCompare(b.github_username)
          }
          handleSort={this.props.handleSort}
        />
        <SortableHeader
          label="Team Name"
          items={this.props.students}
          sortingFn={(a, b) => {
            const aTeam = a.team ? a.team.team_name : "???";
            const bTeam = b.team ? b.team.team_name : "???";
            return aTeam.localeCompare(bTeam);
          }}
          handleSort={this.props.handleSort}
        />
        <SortableHeader
          label="Credit"
          items={this.props.students}
          sortingFn={(a, b) => a.for_credit - b.for_credit}
          handleSort={this.props.handleSort}
        />
        <div style={{ display: "flex", width: "15vw" }}>
          <div>Tags</div>
        </div>
      </div>
    );
  }
}

export default StudentListHeader;
