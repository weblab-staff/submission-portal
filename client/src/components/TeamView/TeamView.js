import React from "react";
import { Redirect } from "react-router-dom";
import WarningBox from "./WarningBox";
import MemberSection from "./MemberSection";
import MilestoneSection from "./MilestoneSection";
import { post } from "../../utils";

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
        TeamView!
        <div>
          {currentTeam.team_name}
          {currentTeam.members.length > 3 ? <WarningBox /> : <div></div>}
          <MemberSection currentTeam={currentTeam} />
          <MilestoneSection currentTeam={currentTeam} />
        </div>
      </div>
    );
  }
}

export default TeamView;
