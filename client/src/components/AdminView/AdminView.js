import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminBody from "./AdminBody";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "iteration",
      viewedYear: 2019,
      showingMilestones: false,
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab, showingMilestones: false });
  };

  setViewedYear = (year) => {
    this.setState({ viewedYear: year });
  };

  toggleViewMilestones = () => {
    this.setState({ showingMilestones: !this.state.showingMilestones });
  };

  render() {
    return (
      <div className="u-flex">
        <AdminSideBar
          activeTab={this.state.activeTab}
          setActiveTab={this.setActiveTab}
          year={this.state.viewedYear}
          showingMilestones={this.state.showingMilestones}
        />
        <AdminBody
          activeTab={this.state.activeTab}
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
