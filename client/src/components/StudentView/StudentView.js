import React from "react";
import { Link } from "react-router-dom";

import StudentViewBody from "./StudentViewBody";
import Nav from "./StudentNav";
import JoinTeam from "../TeamView/JoinTeam";
import TeamView from "../TeamView/TeamView";

import "./StudentView.css";

class StudentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showJoinTeam: false,
    };
  }

  componentDidMount() {}

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
      <>
        <Nav loggedIn />
        <div className="StudentView-container">
          <h1 className="StudentView-greetingHeader">
            Hi, {currentUser.first_name + " " + currentUser.last_name}
          </h1>
          <h2 className="StudentView-team">
            {currentTeam !== null ? (
              <span className="u-positionRelative">
                how's team <span className="StudentView-teamName">{currentTeam.team_name}</span>?
              </span>
            ) : showJoinTeam ? (
              <JoinTeam user={currentUser} hideJoinTeamView={this.toggleJoinTeam} />
            ) : (
              <>
                to get started,{" "}
                <Link
                  className="StudentView-teamName"
                  to={{
                    pathname: "/create-team",
                    state: {
                      currentUser,
                    },
                  }}
                >
                  create a team
                </Link>{" "}
                or{" "}
                <span className="StudentView-teamOption" onClick={this.toggleJoinTeam}>
                  join a team
                </span>
              </>
            )}
          </h2>
          {currentTeam && <TeamView currentTeam={currentTeam} currentUser={currentUser} />}
          {currentTeam && currentTeam.github_url && <StudentViewBody currentTeam={currentTeam} />}
        </div>
      </>
    );
  }
}

export default StudentView;
