import React from "react";
import { hasSubmission } from "../../../js/teams";

class MilestoneSelector extends React.Component {
  render() {
    const { team, milestones } = this.props;
    console.log(team, milestones);
    const styles = {
      background: "#3b66ff",
      color: "white",
      flexGrow: 1,
      minHeight: "100vh"
    };

    return (
      <div style={styles}>
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex" }}>
            <button onClick={this.props.hideMilestonesSection}>{"<-"}</button>
            <div>Milestones</div>
          </div>
          <div>{team.team_name}</div>
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div
              key={`milestone-${index}`}
              onClick={() => this.props.selectMilestone(milestone)}
            >
              <div style={{ display: "flex" }}>
                <div>{milestone.title}</div>
              </div>
              <div>
                {hasSubmission(team, milestone._id)
                  ? team.submissions[milestone._id].length
                  : "0"}
                submissions
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MilestoneSelector;
