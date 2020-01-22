import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./AdminSideBar.css";

class AdminTabButton extends React.Component {
  render() {
    const { activeTab, to, tabLabel, icon, showingMilestones } = this.props;
    const active = !showingMilestones && activeTab === to;

    return (
      <Link
        to={to}
        className={`u-flex u-flexCenter adminSidebar-iconContainer ${active &&
          "adminSidebar-iconContainer--active"}`}
      >
        <FontAwesomeIcon icon={["fas", icon]} size="2x" />
        <span className="adminSidebar-iconLabel">{tabLabel}</span>
      </Link>
    );
  }
}

class AdminSideBar extends React.Component {
  render() {
    const { year, showingMilestones } = this.props;

    return (
      <div className={`u-flex u-flexAlignCenter u-darkGrey adminSidebar-container`}>
        <AdminTabButton
          activeTab={this.props.location.pathname}
          tabLabel={`${year} Class`}
          icon="calendar-alt"
          to="/"
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={this.props.location.pathname}
          tabLabel="Students"
          icon="user"
          to="/students"
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={this.props.location.pathname}
          tabLabel="Grade"
          icon="highlighter"
          to="/grade"
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={this.props.location.pathname}
          tabLabel="Settings"
          icon="cog"
          to="/settings"
          showingMilestones={showingMilestones}
        />
      </div>
    );
  }
}

const AdminSideBarWithRouter = withRouter((props) => <AdminSideBar {...props} />);

export default AdminSideBarWithRouter;
