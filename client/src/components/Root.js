import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";
import Login from "./Login";
import { get } from "../utils";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: null,
      currentTeam: null
    };
  }

  componentDidMount() {
    this.getUser();
  }

  // clean l8er
  getUser = () => {
    get("/api/whoami")
      .then(userObj => {
        if (this.isLoggedIn(userObj)) {
          this.setStateLoggedIn(userObj);
        } else {
          this.setStateNotLoggedIn();
        }
      })
      .catch(err => console.log(err));
  };

  setStateUserWithTeam = userObj => {
    const team_id = userObj.team;
    get(`/api/teams/${team_id}`)
      .then(teamObj => {
        this.setState({
          currentTeam: teamObj,
          currentUser: userObj,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  setStateNotLoggedIn() {
    this.setState({
      currentUser: null,
      loading: false
    });
  }

  setStateLoggedIn(userObj) {
    if (userObj.team) {
      this.setStateUserWithTeam(userObj);
    } else {
      this.setStateUserWithoutTeam(userObj);
    }
  }

  setStateUserWithoutTeam(userObj) {
    this.setState({
      currentUser: userObj,
      loading: false
    });
  }

  render() {
    const { loading, currentUser, currentTeam } = this.state;

    if (loading) {
      return this.getLoadingHtml();
    }

    if (!this.isLoggedIn(currentUser)) {
      return <Login />;
    }

    return (
      <div>
        {currentUser.is_admin ? (
          <AdminView />
        ) : (
          <StudentView
            currentUser={currentUser}
            currentTeam={currentTeam}
            loading={loading}
          />
        )}
      </div>
    );
  }

  isLoggedIn(currentUser) {
    return currentUser._id !== undefined;
  }

  getLoadingHtml() {
    return (
      <div className="browserContainer">
        <div className="greetingContainer">
          <div className="skeleton graphicCircle" />
          <h1 className="skeleton skeleton-line--long" />
          <h2 className="skeleton skeleton-line" />
        </div>
        {getLoadingMilestonesHtml()}
      </div>
    );
  }

  getLoadingMilestonesHtml() {
    return (
      <div className="milestonesContainer">
        {[0, 1, 2, 3].map((_, index) => {
          return (
            <div className="milestone-Container" key={`root-ms-${index}`}>
              <div className="skeleton milestone-Indicator" />
              <div className="milestone-Info">
                <div className="skeleton skeleton-line--short milestone-Name" />
                <div className="skeleton skeleton-line--long milestone-Due" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Root;
