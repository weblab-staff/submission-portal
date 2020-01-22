import React from "react";
import { Switch, Route } from "react-router-dom";
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
    return (
      <Switch>
        <Route exact path="/">
          <ClassIterationsSection setViewedYear={this.props.setViewedYear} />
        </Route>
        <Route exact path="/students">
          <StudentsSection
            showingMilestoneSection={this.props.showingMilestones}
            toggleViewMilestones={this.props.toggleViewMilestones}
          />
        </Route>
        <Route exact path="/grade">
          <GradesSection
            showingMilestoneSection={this.props.showingMilestones}
            toggleViewMilestones={this.props.toggleViewMilestones}
          />
        </Route>
        <Route exact path="/settings">
          <SettingsSection year={this.props.year} />
        </Route>
      </Switch>
    );
  }
}

export default AdminBody;
