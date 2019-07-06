import React from "react";
import MilestonesSelector from "./MilestoneSelector";
import MilestonesDetail from "./MilestoneDetails";
import Feedback from "./Feedback";
import { get } from "../../../utils";

class MilestonesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      team: {},
      milestones: [],
      selectedMilestone: {},
      selectedSubmission: 0,
    };
  }

  componentDidMount() {
    this.getStuff();
  }

  getStuff = () => {
    Promise.all([get(`/api/teams/${this.props.team}`), get("/api/milestones/")])
      .then((data) => {
        this.setState({
          loading: false,
          team: data[0][0],
          milestones: data[1],
          selectedMilestone: data[1].length > 0 ? data[1][0] : {},
        });
      })
      .catch((err) => console.log(err));
  };

  selectMilestone = (milestone) => {
    this.setState({ selectedMilestone: milestone });
  };

  selectSubmission = (index) => {
    this.setState({ selectedSubmission: index });
  };

  render() {
    const styles = {
      display: "flex",
    };

    if (this.state.loading) {
      return <div>Loading!</div>;
    }

    return (
      <div style={styles}>
        <MilestonesSelector
          hideMilestonesSection={this.props.hideMilestonesSection}
          selectMilestone={this.selectMilestone}
          team={this.state.team}
          milestones={this.state.milestones}
        />
        <MilestonesDetail
          team={this.state.team}
          milestone={this.state.selectedMilestone}
          selectSubmission={this.selectSubmission}
        />
        <Feedback
          team={this.state.team}
          milestone={this.state.selectedMilestone}
          selectedSubmission={this.state.selectedSubmission}
        />
      </div>
    );
  }
}

export default MilestonesSection;
