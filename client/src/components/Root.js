import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";
import Login from "./Login";
import StudentNav from "./StudentView/StudentNav";
import { get, MilestoneLoader } from "../utils";
import { Navigate } from "react-router-dom";
import { isRegistered } from "../js/students";

import "./../fonts/AvenirNext-Regular.woff";
import "./../fonts/AvenirNext-Bold.woff";

import { socket } from "../js/teams";

import { post, delet } from "../utils";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: null,
      currentTeam: null,
    };
  }

  componentDidMount() {
    this.getUser();
    socket.on("new_submission", (data) => {
      this.getUser();
    });
    socket.on("teammate_added", (data) => {
      console.log(data);
      this.setState({
        currentTeam: data.team,
      });
    });
    socket.on("teammate_left", (data) => {
      console.log("teammate left, updating state now.");
      if (data.user_id === this.state.currentUser._id) {
        this.setState({
          currentTeam: null,
        });
      }
    });
  }

  // clean l8er
  getUser = () => {
    get("/api/whoami")
      .then((userObj) => {
        if (userObj._id) {
          console.log("hello user:", userObj);
          this.setStateLoggedIn(userObj);
        } else {
          console.log("not logged in");
          this.setStateNotLoggedIn();
        }
      })
      .catch((err) => console.log(err));
  };

  setStateUserWithTeam = (userObj) => {
    const team_id = userObj.team;
    get(`/api/teams/${team_id}`)
      .then((teamObj) => {
        this.setState({
          currentTeam: teamObj,
          currentUser: userObj,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  setStateNotLoggedIn = () => {
    this.setState({
      currentUser: null,
      loading: false,
    });
  };

  setStateLoggedIn = (userObj) => {
    if (userObj.team) {
      this.setStateUserWithTeam(userObj);
    } else {
      this.setStateUserWithoutTeam(userObj);
    }
    console.log(userObj);
    socket.emit("init", { user_id: userObj._id, team_id: userObj.team });
  };

  setStateUserWithoutTeam = (userObj) => {
    this.setState({
      currentUser: userObj,
      loading: false,
    });
  };

  render() {
    const { loading, currentUser, currentTeam } = this.state;
    console.log("render user:", currentUser, currentTeam);

    if (loading) {
      return (
        <>
          <div className="u-flex u-flexJustifyBetweeen StudentNav-container">
            <span className="skeleton skeleton-line StudentNav-header" />
            <div className="StudentNav-linkContainer">
              <div className="skeleton skeleton-line--short" />
            </div>
          </div>
          <div className="StudentView-container">
            <div className="StudentView-greetingContainer">
              <h1 className="skeleton skeleton-line--long StudentView-greetingHeader" />
            </div>
            <h2 className="skeleton skeleton-line" />
            <MilestoneLoader />
          </div>
        </>
      );
    }

    if (!currentUser) {
      return (
        <>
          <StudentNav />
          <Login />
        </>
      );
    }

    return (
      <>
        {currentUser.is_admin ? (
          <AdminView />
        ) : isRegistered(currentUser) ? (
          <StudentView currentUser={currentUser} currentTeam={currentTeam} loading={loading} />
        ) : (
              <Navigate to="/register" />
        )}
      </>
    );
  }
}

export default Root;
