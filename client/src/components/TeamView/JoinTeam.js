import React from "react";
import { get, post } from "../../utils";

class JoinTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      msg: ''
    }
  }

  handleSubmit= (event) => {
    const {
      teamName,
    } = this.state;
    event.preventDefault();
    // TODO route to join team
    post(`/api/teams/${currentUser._id}/join`, {
      team_name: teamName
      }
    )
    .then(response => {
      console.log(response);
      this.setState({
        msg: response
      })

    })
    .catch(err => console.log(err));
    
  }

  handleChange = event => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value
    });
  }

  render() {
  	const {
  		teamName
  	} = this.state;
    return (
      <div>
        <h1>Join Team</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Team Name:
            <input type="text" name="teamName" value={teamName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
    ;
  }
}

export default JoinTeam;
