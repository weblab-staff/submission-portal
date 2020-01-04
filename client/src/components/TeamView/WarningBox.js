import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./WarningBox.css";

const WarningBox = () => {
  return (
    <div className="WarningBox-container">
      <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} className="u-marginRight-sm" />
      <span className="WarningBox-warn">Warning</span>: Teams with more than 3 members cannot
      compete.
    </div>
  );
};

export default WarningBox;
