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
        console.log('HEYO')
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
        <div className="browserContainer">
          <div className="greetingContainer">
            <div className="skeleton graphicCircle" />
            <h1 className="skeleton skeleton-line--long" />
            <h2 className="skeleton skeleton-line" />
          </div>
          <div className="milestonesContainer">
            {[0,1,2,3].map(() => {
              return (
              <div class="milestone-Container">
                <div class="skeleton milestone-Indicator" />
                <div class="milestone-Info">
                  <div class="skeleton skeleton-line--short milestone-Name" />
                  <div class="skeleton skeleton-line--long milestone-Due" />
                </div>
              </div>)
            })}
          </div>
        </div>
      )
    }
    
    if (!currentUser) {
      return <Login />
    }
    
    return (
      <div>
        {currentUser.is_admin ? <AdminView /> : 
          <StudentView currentUser={currentUser} currentTeam={currentTeam} loading={loading} />
        }
      </div>
    );
  }
}

export default Root;
