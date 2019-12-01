import React from "react";

import "./StudentNav.css";

const StudentNav = () => {
  return (
    <div className="u-flex u-flexJustifyBetweeen StudentNav-container">
      <div className="StudentNav-header">student portal</div>
      <div className="StudentNav-linkContainer">
        <a target="_blank" href="http://weblab.mit.edu/about/" className="StudentNav-link">
          About
        </a>
        <a target="_blank" href="http://weblab.mit.edu/schedule/" className="StudentNav-link">
          Schedule
        </a>
        <a className="StudentNav-login" href="/auth/github">
          Log In
        </a>
      </div>
    </div>
  );
};

export default StudentNav;
