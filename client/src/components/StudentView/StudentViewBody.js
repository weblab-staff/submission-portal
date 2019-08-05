import React from "react";
import StudentViewBroad from "./StudentViewBroad";
import StudentViewDetailed from "./StudentViewDetailed";

class StudentViewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleView = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { currentTeam } = this.props;
    const { expanded } = this.state;

    const content = currentTeam ? (
      <div className="milestonesContainer">
        {expanded ? (
          <StudentViewDetailed
            currentTeam={currentTeam}
            toggleView={this.toggleView}
          />
        ) : (
          <StudentViewBroad
            currentTeam={currentTeam}
            toggleView={this.toggleView}
          />
        )}
      </div>
    ) : (
      // TODO: we can eliminate this temporary bandaid when the above components (StudentViewDetailed and StudentViewBroad)
      // allow for a null currentTeam
      <div>Temporary bandaid.</div>
    );

    return content;
  }
}

export default StudentViewBody;
