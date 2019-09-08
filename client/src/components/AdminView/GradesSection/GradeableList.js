import React from "react";
import GradeableEntry from "./GradeableEntry";

import "./GradeSection.css";

class GradeableList extends React.Component {
  render() {
    const { milestones, teams, rangeMin, rangeMax } = this.props;

    return (
      <div className="gradeSection-container u-marginTop-lg">
        <div className="u-marginBottom-lg u-darkGrey">
          <span className="u-marginRight-md">
            <span className="u-black">{teams.length}</span> total teams match
          </span>
          <span>
            <span className="u-black">{rangeMax - rangeMin + 1}</span> teams in range
          </span>
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
