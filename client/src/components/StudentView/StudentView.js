import React from "react";
import { Link } from 'react-router-dom';
import StudentViewBody from "./StudentViewBody";
import { get } from "../../utils";

import "./StudentView.css";

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
      return <div className="browserContainer">LOADING</div>
    }
    return (
      <div className="browserContainer">
        <div className="greetingContainer">
          {/* <ul>
            <li><a href="#">Portal</a></li>
            <li><a href="/auth/logout">Logout</a></li>
          </ul> */}
          <div className="graphicCircle"></div>
          <h1>Welcome, {currentUser.first_name + " " + currentUser.last_name}</h1>
          <h2>
          {currentTeam !== null ? (
            <React.Fragment>
              {"how's "}
              <Link to={{
                pathname: '/team',
                state: {
                  currentUser,
                  currentTeam
                }
              }}>{currentTeam.team_name}</Link>
              {"?"}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to={{
                pathname: '/create-team',
                state: {
                  currentUser
                }
              }}>Create Team</Link>
              <br/>
              <Link to={{
                pathname: '/join-team',
                state: {
                  currentUser
                }
              }}>Join Team</Link>
            </React.Fragment>
            )}
            </h2>
          </div>
        <StudentViewBody currentTeam={currentTeam} />
      </div>
    )
      ;
  }
}

export default StudentView;
