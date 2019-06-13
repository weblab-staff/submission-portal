import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";
import Login from "./Login";
import Register from "./Register";
import { get } from "../utils";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: null,
      // loading: false,
      // currentUser: {isAdmin: true},
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    get('/api/whoami')
      .then(userObj => {
        if (userObj._id !== undefined) {
          this.setState({
            currentUser: userObj,
            loading: false,
          });
        } else {
          this.setState({
            currentUser: null,
            loading: false,
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loading, currentUser } = this.state;    
    
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
        {currentUser.isAdmin ? <AdminView /> : (
          currentUser.first_name ? (
            <StudentView currentUser={currentUser} />
            ) : (
              <Register currentUser={currentUser} />
            )
          )}
      </div>
    );
  }
}

export default Root;
