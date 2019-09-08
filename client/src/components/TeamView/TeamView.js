import React from "react";
import WarningBox from "./WarningBox";

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentTeam } = this.props.location.state;
    const {} = this.state;

    return (
      <div className="browserContainer">
        <ul>
          <li>
            <a href="/">Portal</a>
          </li>
          <li>
            <a href="/auth/logout">Logout</a>
          </li>
        </ul>
        <div>
          <a href="/">Back</a>
          {currentTeam.team_name}
          {currentTeam.members.length > 3 ? <WarningBox /> : <div></div>}
          <MemberSection currentTeam={currentTeam} />
        </div>
      </div>
    );
  }
}

export default TeamView;
