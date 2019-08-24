import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./../../css/admin.css";

class AdminTabButton extends React.Component {
  render() {
    const {
      activeTab,
      tabName,
      tabLabel,
      icon,
      onClick,
      showingMilestones
    } = this.props;
    const active = !showingMilestones && activeTab === tabName;

    return (
      <div
        className={`u-flex u-flexCenter u-pointer adminSidebar-iconContainer ${active &&
          "adminSidebar-iconContainer--active"}`}
        onClick={() => {
          onClick(tabName);
        }}
      >
        <FontAwesomeIcon icon={["fas", icon]} size="2x" />
        <span className="adminSidebar-iconLabel">{tabLabel}</span>
      </div>
    );
  }
}

class AdminSideBar extends React.Component {
  render() {
    const { activeTab, year, setActiveTab, showingMilestones } = this.props;

    return (
      <div
        className={`u-flex u-flexAlignCenter u-darkGrey adminSidebar-container`}
      >
        <AdminTabButton
          activeTab={activeTab}
          tabName="iteration"
          tabLabel={`${year} Class`}
          icon="calendar-alt"
          onClick={setActiveTab}
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={activeTab}
          tabName="students"
          tabLabel="Students"
          icon="user"
          onClick={setActiveTab}
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={activeTab}
          tabName="grade"
          tabLabel="Grade"
          icon="highlighter"
          onClick={setActiveTab}
          showingMilestones={showingMilestones}
        />
        <AdminTabButton
          activeTab={activeTab}
          tabName="settings"
          tabLabel="Settings"
          icon="cog"
          onClick={setActiveTab}
          showingMilestones={showingMilestones}
        />
      </div>
    );
  }
}

export default AdminSideBar;
