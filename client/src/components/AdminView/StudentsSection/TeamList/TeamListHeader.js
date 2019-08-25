import React from "react";
import SortableHeader from "../SortableHeader";
import { ListOptions } from "../StudentsSection";

class TeamListHeader extends React.Component {
  areTeamsSelected = () => {
    return this.props.selectedTeams.length > 0;
  };

  toggleSelect = () => {
    if (this.areTeamsSelected()) {
      this.props.deselectAll();
    } else {
      this.props.selectAll();
    }
  };

  render() {
    return (
      <div className="teamEntry-header">
        <div className="u-flex">
          <input
            type="checkbox"
            checked={this.areTeamsSelected()}
            onChange={this.toggleSelect}
          />
        </div>
        <SortableHeader
          label="Team Name"
          items={this.props.teams}
          sortingFn={(a, b) => a.team_name.localeCompare(b.team_name)}
          handleSort={this.props.handleSort}
        />
        <SortableHeader
          label="Github URL"
          items={this.props.teams}
          sortingFn={(a, b) => {
            const aGit = a.github_url || "undefined";
            const bGit = b.github_url || "undefined";
            return aGit.localeCompare(bGit);
          }}
          handleSort={this.props.handleSort}
        />
        <div style={{ display: "flex", width: "20vw" }}>
          <div>Members</div>
        </div>
        <SortableHeader
          label="Competing?"
          items={this.props.teams}
          sortingFn={(a, b) => a.competing - b.competing}
          handleSort={this.props.handleSort}
        />
        <div style={{ display: "flex", width: "15vw" }}>
          <div>Progress</div>
        </div>
      </div>
    );
  }
}

export default TeamListHeader;
