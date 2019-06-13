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

  render() {
    const { loading, teams } = this.state;

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
        <TeamListHeader />
        {list}
      </div>
    );
  }
}

export default TeamList;
