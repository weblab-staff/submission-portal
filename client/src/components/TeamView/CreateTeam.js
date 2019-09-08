import React from "react";
import { Redirect } from "react-router-dom";
import { get, post } from "../../utils";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: "",
      isCompeting: false,
      redirect: false,
      newTeam: null,
    };
  }

  handleChange = (event) => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value,
    });
  };

  handleSubmit = (event) => {
    const { currentUser } = this.props.location.state;
    const { teamName, isCompeting } = this.state;
    event.preventDefault();
    post(`/api/teams/`, {
      team_name: teamName,
      is_competing: isCompeting,
      creator_id: currentUser._id,
    })
      .then((response) => {
        console.log(response);
        get(`/api/teams/${response._id}`)
          .then((teamObj) => {
            this.setState({
              redirect: true,
              newTeam: teamObj,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { teamName, isCompeting, redirect, newTeam } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: "/team",
            state: {
              currentTeam: newTeam,
            },
          }}
        />
      );
    }
    return (
      <div>
        Create Team
        <ul>
          <li>
            <a href="/">Portal</a>
          </li>
          <li>
            <a href="/auth/logout">Logout</a>
          </li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <label>
            Team Name:
            <input type="text" name="teamName" value={teamName} onChange={this.handleChange} />
          </label>
          <label>
            Are you competing?
            <select name="isCompeting" value={isCompeting} onChange={this.handleChange}>
              <option value={false}>Nopo</option>
              <option value={true}>Yas</option>
            </select>
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default CreateTeam;
