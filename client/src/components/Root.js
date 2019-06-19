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
      currentTeam: null,
      currentClass: null,
    }
  }

  componentDidMount() {
    this.getUser();
    this.getCurrentClass();
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
        console.log('HEYO')
        this.setState({
          currentTeam: teamObj[0],
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  getCurrentClass = () => {
    get(`/api/class/`)
      .then(classObj => {
        this.setState({
          currentClass: classObj[0],
          loading: false
        });
      })
      .catch(err => console.log(err));
  }

  checkIfAdmin = () => {
    return this.state.currentClass.admins.includes(this.state.currentUser.github_id);
  }

  render() {
    const { loading, currentUser, currentTeam, currentClass } = this.state;
    
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
    
    let isAdmin = false;
    if (currentClass) {
      isAdmin = this.checkIfAdmin();  
    }

    return (
      <div>
        {isAdmin ? <AdminView /> : 
          <StudentView currentUser={currentUser} currentTeam={currentTeam} loading={loading} />
        }
      </div>
    );
  }
}

export default Root;
