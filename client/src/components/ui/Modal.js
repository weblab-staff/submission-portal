import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Modal.css";

/**
 * Props
 * @param {bool} show
 * @param {() => void} setShow
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      this.props.show && (
        <div className="Modal-background u-flex u-flexCenter">
          <div className="Modal-container u-positionRelative">
            <span
              className="Modal-close u-pointer"
              onClick={() => {
                this.props.setShow(false);
              }}
            >
              <FontAwesomeIcon icon={["fas", "times"]} size="1x" />
            </span>
            {this.props.children}
          </div>
        </div>
      )
    );
  }
}

export default Modal;
