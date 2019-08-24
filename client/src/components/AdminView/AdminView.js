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
      msTeam: ""
    };
  }

  setActiveTab = tab => {
    this.setState({ activeTab: tab, showingMilestones: false });
  };

  setViewedYear = year => {
    this.setState({ viewedYear: year });
  };

  showMilestonesSection = team => {
    this.setState({
      showingMilestones: true,
      msTeam: team
    });
  };

  hideMilestonesSection = () => {
    this.setState({ showingMilestones: false });
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
          showMilestonesSection={this.showMilestonesSection}
          hideMilestonesSection={this.hideMilestonesSection}
          msTeam={this.state.msTeam}
        />
      </div>
    );
  }
}

export default AdminView;
