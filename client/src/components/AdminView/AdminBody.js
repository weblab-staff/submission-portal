import React from "react";
import ClassIterationsSection from "./ClassIterationsSection/ClassIterationsSection";
import StudentsSection from "./StudentsSection/StudentsSection";
import GradesSection from "./GradesSection/GradesSection";
import SettingsSection from "./SettingsSection/SettingsSection";
import MilestonesSection from "./MilestonesSection/MilestonesSection";

class AdminBody extends React.Component {
  render() {
    const styles = {
      width: "calc(100vw - 120px)",
    };

    return <div style={styles}>{this.renderContent()}</div>;
  }

  renderContent() {
    if (this.props.showingMilestones) {
      return (
        <MilestonesSection
          team={this.props.msTeam}
          hideMilestonesSection={this.props.hideMilestonesSection}
        />
      );
    } else {
      switch (this.props.activeTab) {
        case "iteration":
          return (
            <ClassIterationsSection setViewedYear={this.props.setViewedYear} />
          );
        case "students":
          return <StudentsSection />;
        case "grade":
          return (
            <GradesSection
              showMilestonesSection={this.props.showMilestonesSection}
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
}

export default AdminBody;
