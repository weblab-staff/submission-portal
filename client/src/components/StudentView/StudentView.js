import React from "react";
import StudentViewBody from "./StudentViewBody";
import { get } from "../../utils";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const {
      currentUser,
      currentTeam,
      loading
    } = this.props;
  }


  render() {
    const { 
    } = this.state;
    const {
      currentUser,
      currentTeam,
      loading
    } = this.props;
    if (loading) {
      return <div>LOADING</div>
    }
    return (
      <div>
        <ul>
        <li><a href="#">Portal</a></li>
        <li><a href="/auth/logout">Logout</a></li>
      </ul>
        Welcome, {currentUser.first_name + " " + currentUser.last_name}!
        <div>{currentTeam.team_name}</div>
        <StudentViewBody />
      </div>
    )
    ;
  }
}

export default StudentView;
