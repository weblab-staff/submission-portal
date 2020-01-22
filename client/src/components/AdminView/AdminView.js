import React from "react";
import AdminSideBarWithRouter from "./AdminSideBar";
import AdminBody from "./AdminBody";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewedYear: 2019,
      showingMilestones: false,
    };
  }

  setViewedYear = (year) => {
    this.setState({ viewedYear: year });
  };

  toggleViewMilestones = () => {
    this.setState({ showingMilestones: !this.state.showingMilestones });
  };

  render() {
    return (
      <div className="u-flex">
        <AdminSideBarWithRouter
          year={this.state.viewedYear}
          showingMilestones={this.state.showingMilestones}
        />
        <AdminBody
          year={this.state.viewedYear}
          setViewedYear={this.setViewedYear}
          showingMilestones={this.state.showingMilestones}
          toggleViewMilestones={this.toggleViewMilestones}
          teamId={this.state.selectedTeamId}
        />
      </div>
    );
  }
}

export default AdminView;
