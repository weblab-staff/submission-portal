import React from "react";

import MemberSection from "./MemberSection";
import WarningBox from "./WarningBox";

class TeamView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const { currentTeam, currentUser } = this.props;

    return (
      <>
        {currentTeam.members.length > 3 ? <WarningBox /> : <div></div>}
        <MemberSection currentTeam={currentTeam} currentUser={currentUser} />
      </>
    );
  }
}

export default TeamView;
