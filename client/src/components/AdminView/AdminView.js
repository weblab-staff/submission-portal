import React from "react";
import AdminSideBar from "./AdminSideBar";
import AdminBody from "./AdminBody";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'iteration',
      year: '2019',
    }
  }

  onClickTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <AdminSideBar activeTab={this.state.activeTab} year={this.state.year} onClick={this.onClickTab} />
        <AdminBody activeTab={this.state.activeTab} />
      </div>
    );
  }
}

export default AdminView;
