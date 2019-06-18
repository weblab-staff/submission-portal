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
      // loading: false,
      // currentUser: {isAdmin: true},
    }
  }

  componentDidMount() {
    this.getUser();
  }

  // clean l8er
  getUser = () => {
    get('/api/whoami')
      .then(userObj => {
        if (userObj._id !== undefined) {
          if (userObj.team) {
            this.getTeam(userObj.team);
            this.setState({
              currentUser: userObj,
              // loading: false
            });
          } else {
            this.setState({
              currentUser: userObj,
              loading: false
            });
          }
        } else {
          this.setState({
            currentUser: null,
            loading: false,
          });
        }
      })
      .catch(err => console.log(err));
  }

  getTeam = (id) => {
    get(`/api/teams/${id}`)
      .then(teamObj => {
        this.setState({
          currentTeam: teamObj[0],
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loading, currentUser, currentTeam } = this.state;    
    
    if (loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }
    
    if (!currentUser) {
      return <Login />
    }
    
    return (
      <div>
        {currentUser.isAdmin ? <AdminView /> : 
            <StudentView currentUser={currentUser} currentTeam={currentTeam} loading={loading} />
        }
      </div>
    );
  }
}

export default Root;
