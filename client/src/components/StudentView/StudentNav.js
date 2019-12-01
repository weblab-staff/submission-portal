import React from "react";

import "./StudentNav.css";

class StudentNav extends React.Component {
  render() {
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
          {this.props.loggedIn !== true && (
            <a className="StudentNav-login" href="/auth/github">
              Log In
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default StudentNav;
