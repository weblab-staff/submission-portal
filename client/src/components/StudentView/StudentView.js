import React from "react";
import StudentViewBody from "./StudentViewBody";

class StudentView extends React.Component {
  render() {
    return (
      <div>
        <ul>
        <li><a href="#">Portal</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
        Welcome, {this.props.currentUser.username}!
        <StudentViewBody />
      </div>
    )
    ;
  }
}

export default StudentView;
