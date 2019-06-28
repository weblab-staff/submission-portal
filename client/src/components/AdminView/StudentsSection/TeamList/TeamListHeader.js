import React from "react";

class TeamListHeader extends React.Component {
  renderSortIcon = (param) => {
    const { activeSort, sortOrder } = this.props;

    let text = "O";
    if (activeSort === param) {
      if (sortOrder === "ASC") {
        text = "asc";
      } else {
        text = "des";
      }
    }

    return <div onClick={() => this.props.handleSort(param)}>{text}</div>;
  };

  render() {
    const styles = {
      display: "flex",
      alignItems: "center",
      margin: "3px 40px",
      padding: "5px",
    };

    return (
      <div style={styles}>
        <div style={{ display: "flex", width: "3vw" }}>
          <input type="checkbox" />
        </div>
        <div style={{ display: "flex", width: "15vw" }}>
          <div style={{ marginRight: "5px" }}>Team Name</div>
          {this.renderSortIcon("team_name")}
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>GitHub</div>
          {this.renderSortIcon("github_url")}
        </div>
        <div style={{ display: "flex", width: "20vw" }}>
          <div>Members</div>
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>Competing?</div>
          {this.renderSortIcon("competing")}
        </div>
        <div style={{ display: "flex", width: "15vw" }}>
          <div>Progress</div>
        </div>
      </div>
    );
  }
}

export default TeamListHeader;
