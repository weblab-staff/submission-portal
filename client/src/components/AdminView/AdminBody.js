import React from "react";
import ClassIterationsSection from "./ClassIterationsSection/ClassIterationsSection";
import StudentsSection from "./StudentsSection/StudentsSection";
import GradesSection from "./GradesSection/GradesSection";
import SettingsSection from "./SettingsSection/SettingsSection";

import "./AdminBody.css";

class AdminBody extends React.Component {
  render() {
    return <div className="adminBody-container">{this.renderContent()}</div>;
  }
  renderContent() {
    switch (this.props.activeTab) {
      case "iteration":
        return <ClassIterationsSection setViewedYear={this.props.setViewedYear} />;
      case "students":
        return (
          <StudentsSection
            showingMilestoneSection={this.props.showingMilestones}
            toggleViewMilestones={this.props.toggleViewMilestones}
          />
        );
      case "grade":
        return (
          <GradesSection
            showingMilestoneSection={this.props.showingMilestones}
            toggleViewMilestones={this.props.toggleViewMilestones}
          />
        );
      case "settings":
        return <SettingsSection year={this.props.year} />;
      default:
        console.log("should never get here");
        return;
    }
  }
}

export default AdminBody;
