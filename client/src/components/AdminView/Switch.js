import React from "react";

import "./Switch.css";

export default class Switch extends React.Component {
  handleChange = () => {
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render() {
    return (
      <div
        className={`u-pointer switch ${this.props.checked && "switch--on"}`}
        onClick={this.handleChange}
      />
    );
  }
}
