import React from "react";
import AdminView from "./AdminView/AdminView";
import StudentView from "./StudentView/StudentView";

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // should use the below eventually
      // loading: true,
      // currentUser: null,
      loading: false,
      currentUser: {
        name: 'Matt',
        isAdmin: true,
      }
    }
  }

  componentDidMount() {
    // The below isn't exact but it's basically the right idea
    // get('/whoami')
    //   .then(data => {
    //     this.setState({
    //       loading: false,
    //       currentUser: data.user,
    //     });
    //   })
    //   .catch(err => console.log(err));
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

    return (
      <div>
        {currentUser.isAdmin ? <AdminView /> : <StudentView />}
      </div>
    );
  }
}

export default Root;
