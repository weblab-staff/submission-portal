import React from "react";
import GradeableEntry from "./GradeableEntry";

class GradeableList extends React.Component {
  render() {
    const { milestones, teams, rangeMin, rangeMax } = this.props;

    return (
      <div style={{padding: '0px 40px'}}>
        <div>
          <span>{teams.length} total teams match</span>
          <span>{rangeMax-rangeMin+1} teams in range</span>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {teams.slice(rangeMin-1, rangeMax).map((team, index) => 
            <GradeableEntry 
              key={`entry-${index}`}
              num={rangeMin+index}
              team={team}
              milestones={milestones}
            />
          )}
        </div>
      </div>
    );
  }
}

export default GradeableList;
