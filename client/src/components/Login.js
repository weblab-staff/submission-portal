import React from "react";

// import "./../css/app.css";
import "./../css/theme.css";

class Login extends React.Component {
  render() {
    return (
      <div className="browserContainer u-flex u-flexCenter--browser">
        <div className="u-textCenter">
          <h1 className="u-blue">Enter the Portal</h1>
          <a className="studentButton" href="/auth/github">login with github</a>
        </div>
      </div>
    )
    ;
  }
}

export default Login;
