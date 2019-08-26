import React from "react";
import { get, post } from "../../utils";
import { addMember } from "../../js/teams";

class JoinTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameIdMap: {},
      teamName: "",
      msg: "",
      loading: true,
    };
  }

  componentDidMount() {
    get("/api/teams/names").then((res) => {
      this.setState({ loading: false, teamNameIdMap: res });
    });
  }

  handleSubmit = (event) => {
    const { teamName, teamNameIdMap } = this.state;
    event.preventDefault();
    addMember(teamNameIdMap[teamName], this.props.location.state.currentUser._id);
    // post(`/api/teams/${currentUser._id}/join`, {
    //   team_name: teamName,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       msg: response,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value,
    });
  };

  render() {
    const { teamName } = this.state;
    return (
      <div>
        <h1>Join Team</h1>

        <form onSubmit={this.handleSubmit}>
          <label>
            Team Name:
            <input type="text" name="teamName" value={teamName} onChange={this.handleChange} />
          </label>
          <input
            type="submit"
            disabled={this.state.loading || !this.state.teamNameIdMap[this.state.teamName]}
            value="Submit"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    );
  }
}

export default JoinTeam;
