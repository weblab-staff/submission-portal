import React from "react";
import StudentList from "./StudentList/StudentList";
import TeamList from "./TeamList/TeamList";
import { ListOptions } from "./StudentsSection";

class StudentsBody extends React.Component {
  render() {
    if (this.props.loading) {
      return <div>loading</div>;
    }

    return (
      <div>
        {this.props.activeList === ListOptions.INDIVIDUAL ? (
          <StudentList
            students={this.props.students}
            selectedStudents={this.props.selectedStudents}
            selectStudent={this.props.selectStudent}
            deselectStudent={this.props.deselectStudent}
            selectAll={this.props.selectAll}
            deselectAll={this.props.deselectAll}
            showMilestonesSection={this.props.showMilestonesSection}
            afterSort={this.props.afterSort}
          />
        ) : (
          <TeamList
            teams={this.props.teams}
            selectedTeams={this.props.selectedTeams}
            selectTeam={this.props.selectTeam}
            deselectTeam={this.props.deselectTeam}
            selectAll={this.props.selectAll}
            deselectAll={this.props.deselectAll}
            showMilestonesSection={this.props.showMilestonesSection}
          />
        )}
      </div>
    );
  }
}

export default StudentsBody;
