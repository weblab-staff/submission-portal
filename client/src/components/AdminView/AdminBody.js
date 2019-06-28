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

    let content;
    if (this.props.showingMilestones) {
      content = (
        <MilestonesSection
          hideMilestonesSection={this.props.hideMilestonesSection}
        />
      );
    } else {
      switch (this.props.activeTab) {
        case "iteration":
          content = (
            <ClassIterationsSection setViewedYear={this.props.setViewedYear} />
          );
          break;
        case "students":
          content = <StudentsSection />;
          break;
        case "grade":
          content = (
            <GradesSection
              showMilestonesSection={this.props.showMilestonesSection}
            />
          );
          break;
        case "settings":
          content = <SettingsSection year={this.props.year} />;
          break;
        default:
          console.log("should never get here");
          break;
      }
    }

    return <div style={styles}>{content}</div>;
  }
}

export default AdminBody;
