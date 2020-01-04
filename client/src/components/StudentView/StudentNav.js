import React from "react";

import "./StudentNav.css";

const LoggedOutLinks = () => {
  return (
    <>
      <a target="_blank" href="http://weblab.mit.edu/about/" className="StudentNav-link">
        About
      </a>
      <a target="_blank" href="http://weblab.mit.edu/schedule/" className="StudentNav-link">
        Schedule
      </a>
      <a className="StudentNav-login" href="/auth/github">
        Log In
      </a>
    </>
  );
};
const LoggedInLinks = () => {
  return (
    <>
      <a href="/auth/logout" className="StudentNav-link">
        Logout
      </a>
    </>
  );
};

class StudentNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flex u-flexJustifyBetweeen StudentNav-container">
        <a className="StudentNav-header" href="/">
          student portal
        </a>
        <div className="StudentNav-linkContainer">
          {this.props.loggedIn ? <LoggedInLinks /> : <LoggedOutLinks />}
        </div>
      </div>
    );
  }
}

export default StudentNav;
