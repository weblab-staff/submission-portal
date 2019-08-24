import React from "react";
import { ListOptions } from "../StudentsSection";

class StudentsHeaderListButton extends React.Component {
  render() {
    const { tabLabel, activeList, onClick } = this.props;

    const styles = {
      margin: "0 10px",
      cursor: "pointer",
      border: activeList === this.props.tabLabel ? "1px solid blue" : "",
    };

    return (
      <div style={styles} onClick={() => onClick(tabLabel)}>
        {tabLabel}
      </div>
    );
  }
}

export default StudentsHeaderListButton;
