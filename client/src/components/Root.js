import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";
import Login from "./Login";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // should use the below eventually
      loading: true,
      currentUser: null,
      // loading: false,
      // currentUser: {
      //   name: 'Matt',
      //   isAdmin: false,
      // }
    }
  }

  componentDidMount() {
    this.getUser();
  }


  getUser = () => {
    fetch('/api/whoami')
      .then(res => res.json())
      .then(
        userObj => {
          if (userObj.username !== undefined) {
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
        }
      ).catch(err => console.log(err));
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
        {currentUser.isAdmin ? <AdminView /> : <StudentView currentUser={currentUser} />}
      </div>
    );
  }
}

export default Root;
