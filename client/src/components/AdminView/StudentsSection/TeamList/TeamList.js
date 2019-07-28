import React from "react";
import TeamListHeader from "./TeamListHeader";
import TeamEntry from "./TeamEntry";
import { get } from "../../../../utils";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      teams: [],
      milestones: [],
      activeSort: null,
      sortOrder: "NONE",
    };
  }

  componentDidMount() {
    this.getTeams();
  }

  getTeams = () => {
    Promise.all([
      get("/api/teams", { populate: true }),
      get("/api/milestones/"),
    ])
      .then((data) => {
        this.setState({
          loading: false,
          teams: data[0],
          milestones: data[1],
        });
      })
      .catch((err) => console.log(err));
  };

  genSortFunction(param, sortOrder) {
    if (sortOrder === "ASC") {
      if (param === "competing") {
        return (a, b) => a[param] - b[param];
      }
      if (param === "github_url") {
        return (a, b) => {
          const aGit = a.github_url || "undefined";
          const bGit = b.github_url || "undefined";
          return aGit.localeCompare(bGit);
        };
      }

      return (a, b) => a[param].localeCompare(b[param]);
    } else {
      if (param === "competing") {
        return (a, b) => b[param] - a[param];
      }
      if (param === "github_url") {
        return (a, b) => {
          const aGit = a.github_url || "undefined";
          const bGit = b.github_url || "undefined";
          return bGit.localeCompare(aGit);
        };
      }

      return (a, b) => b[param].localeCompare(a[param]);
    }
  }

  handleSort = (param) => {
    let sortOrder = "ASC";
    if (this.state.activeSort === param && this.state.sortOrder === "ASC") {
      sortOrder = "DES";
    }

    let sortedTeams = [...this.state.teams];
    sortedTeams.sort(this.genSortFunction(param, sortOrder));

    this.setState({
      teams: sortedTeams,
      activeSort: param,
      sortOrder,
    });
  };

  render() {
    const { loading, teams, milestones, activeSort, sortOrder } = this.state;

    if (loading) {
      return <div>Loading!</div>;
    }

    let list = <div>No teams!</div>;
    if (teams.length > 0) {
      list = teams.map((el, index) => (
        <TeamEntry
          key={index}
          info={el}
          milestones={milestones}
          refresh={this.getTeams}
        />
      ));
    }

    return (
      <div>
        <TeamListHeader
          activeSort={activeSort}
          sortOrder={sortOrder}
          handleSort={this.handleSort}
        />
        {list}
      </div>
    );
  }
}

export default TeamList;
