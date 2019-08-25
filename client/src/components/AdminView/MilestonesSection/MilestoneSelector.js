import React from "react";
import { hasSubmission } from "../../../js/teams";

class MilestoneSelector extends React.Component {
  countSubmissions = (team, id) => {
    if (hasSubmission(team, id)) {
      return team.submissions[id].length;
    }

    return 0;
  };

  render() {
    const { team, milestones } = this.props;
    console.log(team, milestones);
    const styles = {
      background: "#3b66ff",
      color: "white",
      flexGrow: 1,
      minHeight: "100vh",
    };

    return (
      <div style={styles}>
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex" }}>
            <button onClick={this.props.hideMilestonesSection}>{"<-"}</button>
            <div>Milestones</div>
          </div>
          <div>Team {team.team_name}</div>
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div
              style={{ cursor: "pointer", marginBottom: "10px" }}
              key={`milestone-${index}`}
              onClick={() => this.props.selectMilestone(milestone)}
            >
              <div style={{ display: "flex" }}>
                <div>{milestone.title}</div>
              </div>
              <div>{`${this.countSubmissions(team, milestone._id)} submissions`}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MilestoneSelector;
