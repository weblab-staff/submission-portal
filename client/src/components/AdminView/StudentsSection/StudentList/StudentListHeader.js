import React from "react";

class StudentListHeader extends React.Component {
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

  areStudentsSelected = () => {
    return this.props.selectedStudents.length > 0;
  };

  toggleSelect = () => {
    if (this.areStudentsSelected()) {
      this.props.deselectAll();
    } else {
      this.props.selectAll();
    }
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
          <input
            type="checkbox"
            checked={this.areStudentsSelected()}
            onChange={this.toggleSelect}
          />
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>First Name</div>
          {this.renderSortIcon("first_name")}
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>Last Name</div>
          {this.renderSortIcon("last_name")}
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>GitHub</div>
          {this.renderSortIcon("github_username")}
        </div>
        <div style={{ display: "flex", width: "10vw" }}>
          <div style={{ marginRight: "5px" }}>Team</div>
          {this.renderSortIcon("team_name")}
        </div>
        <div style={{ display: "flex", width: "5vw" }}>
          <div style={{ marginRight: "5px" }}>Credit</div>
          {this.renderSortIcon("for_credit")}
        </div>
        <div style={{ display: "flex", width: "15vw" }}>
          <div>Tags</div>
        </div>
      </div>
    );
  }
}

export default StudentListHeader;
