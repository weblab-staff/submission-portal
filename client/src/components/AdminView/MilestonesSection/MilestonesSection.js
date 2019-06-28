import React from "react";
import MilestonesSelector from "./MilestoneSelector";
import MilestonesDetail from "./MilestoneDetails";
import Feedback from "./Feedback";

class MilestonesSection extends React.Component {
  render() {
    const styles = {
      display: "flex",
    };

    return (
      <div style={styles}>
        <MilestonesSelector
          hideMilestonesSection={this.props.hideMilestonesSection}
        />
        <MilestonesDetail />
        <Feedback />
      </div>
    );
  }
}

export default MilestonesSection;
