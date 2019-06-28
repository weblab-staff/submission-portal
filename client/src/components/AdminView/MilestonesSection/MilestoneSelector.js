import React from "react";

class MilestoneSelector extends React.Component {
  render() {
    return (
      <div>
        <div onClick={this.props.hideMilestonesSection}>{"<-"}</div>
        <div>Milestones</div>
      </div>
    );
  }
}

export default MilestoneSelector;
