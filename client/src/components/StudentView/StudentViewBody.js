import React from "react";
import StudentViewBroad from "./StudentViewBroad";
import StudentViewDetailed from "./StudentViewDetailed";
import { get } from "../../utils";
import { MilestoneLoader } from "../../utils";
import { socket } from "../../js/teams";

const TEAM_PLACEHOLDER = "$TEAMNAME";

class StudentViewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      milestones: [],
      loading: true,
      selectedMilestoneId: -1,
    };
  }

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones = () => {
    const { currentTeam } = this.props;
    get(`/api/milestones`)
      .then((milestones) => {
        // modify link to autofill teamname
        milestones.forEach((mileObj) => {
          if (!mileObj.handin_link) return;
          mileObj.handin_link = mileObj.handin_link.replace(
            TEAM_PLACEHOLDER,
            currentTeam.team_name
          );
        });

        this.setState({
          milestones: milestones,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  toggleView = (selectedMilestone) => {
    this.setState({
      expanded: !this.state.expanded,
      selectedMilestoneId: selectedMilestone,
    });
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
                submissions={currentTeam ? currentTeam.submissions[selectedMilestoneId] : []}
                milestone={milestones.find((milestone) => milestone._id === selectedMilestoneId)}
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
