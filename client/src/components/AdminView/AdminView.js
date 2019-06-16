import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminBody from "./AdminBody";
import "./AdminView.css";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'iteration',
      viewedYear: 2019,
    }
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  setViewedYear = (year) => {
    this.setState({ viewedYear: year });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <AdminSideBar activeTab={this.state.activeTab} year={this.state.viewedYear} setActiveTab={this.setActiveTab} />
        <AdminBody activeTab={this.state.activeTab} year={this.state.viewedYear} setViewedYear={this.setViewedYear} />
      </div>
    );
  }
}

export default AdminView;
