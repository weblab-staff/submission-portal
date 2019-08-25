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
      <div
        className={`u-pointer studentsHeader-listButton ${activeList === this.props.tabLabel &&
          "studentsHeader-listButton--active"}`}
        onClick={() => onClick(tabLabel)}
      >
        {tabLabel}
      </div>
    );
  }
}

export default StudentsHeaderListButton;
