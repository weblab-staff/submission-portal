import React from "react";
import TeamListHeader from "./TeamListHeader";
import TeamEntry from "./TeamEntry";

class TeamList extends React.Component {
  isSelected = (team) => {
    return this.props.selectedTeams.includes(team);
  };

  render() {
    let list = <div>No teams!</div>;

    if (this.props.teams && this.props.teams.length > 0) {
      list = this.props.teams.map((el, index) => (
        <TeamEntry
          key={`team-${index}`}
          info={el}
          milestones={this.props.milestones}
          selected={this.isSelected(el)}
          selectTeam={this.props.selectTeam}
          deselectTeam={this.props.deselectTeam}
          showMilestonesSection={this.props.showMilestonesSection}
        />
      ));
    }

    return (
      <div>
        <TeamListHeader
          teams={this.props.teams}
          selectedTeams={this.props.selectedTeams}
          selectAll={this.props.selectAll}
          deselectAll={this.props.deselectAll}
          setInfo={this.props.setInfo}
        />
        {list}
      </div>
    );
  }
}

export default TeamList;
