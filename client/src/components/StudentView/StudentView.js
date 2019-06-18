import React from "react";
import { Link } from 'react-router-dom';
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
        {currentTeam !== null ? (
          <Link to={{
            pathname: '/team',
            state: {
              currentUser,
              currentTeam
            }
          }}>{currentTeam.team_name}</Link>
        ) : (
            <Link to={{
              pathname: '/create-team',
              state: {
                currentUser
              }
            }}>Create Team</Link>
          )}
        <StudentViewBody />
      </div>
    )
      ;
  }
}

export default StudentView;
