import React from "react";
import SortableHeader from "../SortableHeader";
import { ListOptions } from "../StudentsSection";

class StudentListHeader extends React.Component {
  areStudentsSelected = () => {
    return this.props.selectedStudents.length > 0;
  };

  toggleSelect = () => {
    if (this.areStudentsSelected()) {
      this.props.deselectAll(ListOptions.INDIVIDUAL);
    } else {
      this.props.selectAll(ListOptions.INDIVIDUAL);
    }
  };

  setInfo = (items) => {
    this.props.setInfo(ListOptions.INDIVIDUAL, items);
  };

  render() {
    const styles = {
      display: "flex",
      alignItems: "center",
      margin: "3px 40px",
      padding: "5px",
    };

    return (
      <div style={styles}>
        <div style={{ display: "flex", width: "3vw" }}>
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
          setInfo={this.setInfo}
        />
        <SortableHeader
          label="Last Name"
          items={this.props.students}
          sortingFn={(a, b) => a.last_name.localeCompare(b.last_name)}
          setInfo={this.setInfo}
        />
        <SortableHeader
          label="Github Username"
          items={this.props.students}
          sortingFn={(a, b) =>
            a.github_username.localeCompare(b.github_username)
          }
          setInfo={this.setInfo}
        />
        <SortableHeader
          label="Team Name"
          items={this.props.students}
          sortingFn={(a, b) => {
            const aTeam = a.team ? a.team.team_name : "???";
            const bTeam = b.team ? b.team.team_name : "???";
            return aTeam.localeCompare(bTeam);
          }}
          setInfo={this.setInfo}
        />
        <SortableHeader
          label="For Credit?"
          items={this.props.students}
          sortingFn={(a, b) => a.for_credit - b.for_credit}
          setInfo={this.setInfo}
        />
        <div style={{ display: "flex", width: "15vw" }}>
          <div>Tags</div>
        </div>
      </div>
    );
  }
}

export default StudentListHeader;
