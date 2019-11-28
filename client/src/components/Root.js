import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";
import UnderConstruction from "./UnderConstruction/UnderConstruction";
import Login from "./Login";
import { get, MilestoneLoader } from "../utils";
import { Redirect } from "react-router-dom";
import { isRegistered } from "../js/students";

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
        <div className="browserContainer browserContainer--studentView">
          <div className="greetingContainer">
            <div className="skeleton graphicCircle" />
            <h1 className="skeleton skeleton-line--long" />
            <h2 className="skeleton skeleton-line" />
          </div>
          <MilestoneLoader />
        </div>
      );
    }

    if (!currentUser) {
      return <Login />;
    }

    return (
      <div>
        {currentUser.is_admin ? (
          <AdminView />
        ) : isRegistered(currentUser) ? (
          // <StudentView currentUser={currentUser} currentTeam={currentTeam} loading={loading}/>
          <UnderConstruction />
        ) : (
          <Redirect to="/register" />
        )}
      </div>
    );
  }
}

export default Root;
