import React from "react";
import GradeableEntry from "./GradeableEntry";

import "./GradeSection.css";

class GradeableList extends React.Component {
  render() {
    const { milestones, teams, rangeMin, rangeMax } = this.props;

    return (
      <div className="gradeSection-container">
        <div>
          <span>{teams.length} total teams match</span>
          <span>{rangeMax - rangeMin + 1} teams in range</span>
        </div>
        <div className="gradeSection-teamContainer">
          {teams.slice(rangeMin - 1, rangeMax).map((team, index) => (
            <GradeableEntry
              key={`entry-${index}`}
              num={rangeMin + index}
              team={team}
              milestones={milestones}
              showMilestonesSection={this.props.showMilestonesSection}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GradeableList;
