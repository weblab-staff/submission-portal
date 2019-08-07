import React from "react";
import StudentViewBroad from "./StudentViewBroad";
import StudentViewDetailed from "./StudentViewDetailed";
import { get } from "../../utils";
import { MilestoneLoader } from "../../utils";

class StudentViewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      milestones: [],
      loading: true,
      selectedMilestoneId: -1
    };
  }

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones = () => {
    get(`/api/milestones`)
      .then(milestones => {
        this.setState({
          milestones: milestones,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  toggleView = selectedMilestone => {
    const stateSwitch = () => {
      this.setState({
        expanded: !this.state.expanded,
        selectedMilestoneId: selectedMilestone
      });
    };
    return stateSwitch;
  };

  render() {
    const { currentTeam } = this.props;
    const { loading, expanded, milestones, selectedMilestoneId } = this.state;

    return (
      <div>
        {loading ? (
          <MilestoneLoader />
        ) : (
          <div className="milestonesContainer">
            {expanded ? (
              <StudentViewDetailed
                submissions={currentTeam ? currentTeam.submissions : []}
                milestone={milestones.find(
                  milestone => milestone._id === selectedMilestoneId
                )}
                toggleView={this.toggleView}
              />
            ) : (
              <StudentViewBroad
                currentTeam={currentTeam}
                milestones={milestones}
                toggleView={this.toggleView}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default StudentViewBody;
