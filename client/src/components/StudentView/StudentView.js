import React from "react";
import { Link } from "react-router-dom";
import StudentViewBody from "./StudentViewBody";

import "./StudentView.css";
import JoinTeam from "../TeamView/JoinTeam";
import { removeMember } from "../../js/teams";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showJoinTeam: false,
    };
  }

  componentDidMount() {
    const { currentUser, currentTeam, loading } = this.props;
  }

  toggleJoinTeam = () => {
    this.setState({
      showJoinTeam: !this.state.showJoinTeam,
    });
  };

  render() {
    const { showJoinTeam } = this.state;
    const { currentUser, currentTeam, loading } = this.props;
    if (loading) {
      return <div className="browserContainer browserContainer--studentView">LOADING</div>;
    }
    return (
      <div className="browserContainer browserContainer--studentView">
        <div className="greetingContainer">
          {/* <ul>
            <li><a href="#">Portal</a></li>
            <li><a href="/auth/logout">Logout</a></li>
          </ul> */}
          <div className="graphicCircle" />
          <h1>Welcome, {currentUser.first_name + " " + currentUser.last_name}</h1>
          <h2>
            {currentTeam !== null ? (
              <React.Fragment>
                {"how's "}
                <Link
                  to={{
                    pathname: "/team",
                    state: {
                      currentUser,
                      currentTeam,
                    },
                  }}
                >
                  {currentTeam.team_name}
                </Link>
                {"?"}
                <br />
                <button onClick={() => removeMember(currentTeam._id, currentUser._id)}>
                  Leave team?
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link
                  to={{
                    pathname: "/create-team",
                    state: {
                      currentUser,
                    },
                  }}
                >
                  Create Team
                </Link>
                <br />

                {showJoinTeam ? (
                  <JoinTeam user={currentUser} hideJoinTeamView={this.toggleJoinTeam} />
                ) : (
                  <button onClick={this.toggleJoinTeam}>Join Team?</button>
                )}
              </React.Fragment>
            )}
          </h2>
        </div>
        <StudentViewBody currentTeam={currentTeam} />
      </div>
    );
  }
}

export default StudentView;
