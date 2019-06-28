import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminBody from "./AdminBody";
import "./AdminView.css";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMilestones: false,
      activeTab: "iteration",
      viewedYear: 2019,
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  setViewedYear = (year) => {
    this.setState({ viewedYear: year });
  };

  showMilestonesSection = (team, milestones) => {
    console.log(team, milestones);
    this.setState({ showingMilestones: true });
  };

  hideMilestonesSection = () => {
    this.setState({ showingMilestones: false });
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <AdminSideBar
          activeTab={this.state.activeTab}
          setActiveTab={this.setActiveTab}
          year={this.state.viewedYear}
        />
        <AdminBody
          activeTab={this.state.activeTab}
          year={this.state.viewedYear}
          setViewedYear={this.setViewedYear}
          showingMilestones={this.state.showingMilestones}
          showMilestonesSection={this.showMilestonesSection}
          hideMilestonesSection={this.hideMilestonesSection}
        />
      </div>
    );
  }
}

export default AdminView;
