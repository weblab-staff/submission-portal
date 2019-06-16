import React from "react";
import TeamListHeader from "./TeamListHeader";
import TeamEntry from "./TeamEntry";
import { get } from "../../../../utils";

class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      teams: [
        {team_name: 'Gourdman', github_url: 'gourdman', members: [{first_name: 'a'}, {first_name: 'b'}], competing: true, milestones: [{id: 1, complete: true}]},
      ],
      activeSort: null,
      sortOrder: 'NONE',
    };
  }

  componentDidMount() {
    // this.getTeams();
  }

  getTeams = () => {
    get('/api/teams/')
      .then(data => {
        if (data) {
          console.log(data);
          
          this.setState({
            loading: false,
            teams: data,
          });
        } else {
          this.setState({
            loading: false,
            teams: null,
          });
        }
      })
      .catch(err => console.log(err));
  }

  genSortFunction(param, sortOrder) {
    if (sortOrder === 'ASC') {
      if (param === 'competing') {
        return (a, b) => a[param] - b[param];
      }

      return (a, b) => a[param].localeCompare(b[param]);
    } else {
      if (param === 'competing') {
        return (a, b) => b[param] - a[param];
      }

      return (a, b) => b[param].localeCompare(a[param]);
    }
  }

  handleSort = (param) => {
    let sortOrder = 'ASC';
    if (this.state.activeSort === param && this.state.sortOrder === 'ASC') {
      sortOrder = 'DES';
    }

    let sortedTeams = [...this.state.teams];
    sortedTeams.sort(this.genSortFunction(param, sortOrder));    

    this.setState({
      teams: sortedTeams,
      activeSort: param,
      sortOrder
    });
  }

  render() {
    const { loading, teams, activeSort, sortOrder } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }

    let list = (
      <div>
        No teams!
      </div>
    );
    if (teams && teams.length > 0) {
      list = teams.map((el, index) => 
        <TeamEntry key={index} info={el} />
      );
    }
    
    return (
      <div>
        <TeamListHeader 
          activeSort={activeSort} sortOrder={sortOrder}
          handleSort={this.handleSort} 
        />
        {list}
      </div>
    );
  }
}

export default TeamList;
