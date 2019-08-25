import React from "react";
import { hasSubmission } from "../../../js/teams";
class GradeableEntry extends React.Component {
  // showMilestonesSection = () => {
  //   this.props.showMilestonesSection();
  // };

  render() {
    const { num, team, milestones } = this.props;

    const teamBlock = {
      border: "1px solid black",
      boxShadow: "2px 1px 1px",
      margin: "20px 20px",
      width: "250px",
      padding: "20px"
    };

    const iconStyle = {
      margin: "0 10px",
      cursor: "pointer"
    };

    return (
      <div style={teamBlock}>
        <span>
          {team.team_name} #{num}
        </span>
        <div
          style={iconStyle}
          onClick={() => this.props.showMilestonesSection(team._id)}
        >
          View Submissions
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div key={`${team.team_name}-ms-${index}`}>
              <span>{milestone.title}</span>
              <span style={{ margin: "0 10px" }}>
                {hasSubmission(team, milestone._id) ? "Y" : "N"}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GradeableEntry;
