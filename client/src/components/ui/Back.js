import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Back.css";

/**
 * Props
 * @param {() => void} trigger
 * @param {string} to
 * @param {string} className
 * @param {bool} absolute position
 */
class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <a
        className={classnames(
          this.props.className,
          "Back u-pointer u-marginLeft-md u-flex u-flexCenter",
          { "Back--absolute": this.props.absolute }
        )}
        onClick={this.props.trigger}
        href={this.props.to}
      >
        <FontAwesomeIcon icon={["fas", "arrow-left"]} size="1x" />
      </a>
    );
  }
}
export default BackButton;
