import React from "react";

class MilestoneSelector extends React.Component {
  countSubmissions = (team, milestone) => {
    return team.submissions.filter((el) => el.milestone._id === milestone._id)
      .length;
  };

  render() {
    const { team, milestones } = this.props;

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
          <div>{team.team_name}</div>
        </div>
        <div>
          {milestones.map((ms, index) => (
            <div
              key={`milestone-${index}`}
              onClick={() => this.props.selectMilestone(ms)}
            >
              <div style={{ display: "flex" }}>
                <div>{this.countSubmissions(team, ms) > 0 ? "Y" : "N"}</div>
                <div>{ms.title}</div>
              </div>
              <div>{this.countSubmissions(team, ms)} submissions</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MilestoneSelector;
