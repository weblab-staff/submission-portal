import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StudentNav from "./../StudentView/StudentNav";

import "../../css/theme.css";

class UnderConstruction extends React.Component {
  render() {
    return (
      <>
        <div className="u-flex u-flexCenter" style={{ marginTop: "20vh" }}>
          <div className="u-textCenter">
            <FontAwesomeIcon className="u-blue" icon={["fas", "tools"]} size="4x" />
            <h1 className="u-blue">thanks for registering!</h1>
            <div>You're all set for now.</div>
            <div>The rest of the site is under construction.</div>
            <div>Check back in a while for more.</div>
          </div>
        </div>
      </>
    );
  }
}

export default UnderConstruction;
