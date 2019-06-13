import React from "react";

class TeamEntry extends React.Component {
  showMilestonesSection = () => {
    console.log(`Showing milestones for ${this.props.info.team_name}`);
  }

  deleteTeam = () => {
    if (confirm(`Are you sure you want to delete ${this.props.info.team_name}?`)) {
      console.log('Deleting');
    } else {
      console.log('NOT deleting');
    }
  }

  render() {
    const { info } = this.props;

    const styles = {
      display: 'flex',
      alignItems: 'center',
      margin: '3px 40px',
      padding: '5px',
      border: '1px solid gray',
      borderRadius: '2px',
    }

    const iconStyle = {
      margin: '0 10px',
      cursor: 'pointer',
    }

    return (
      <div style={styles}>
        <div style={{width: '3vw'}}>
          <input type='checkbox'></input>
        </div>
        <div style={{width: '15vw'}}>
          <div>{info.team_name}</div>
        </div>
        <div style={{width: '10vw'}}>
          <a href={`https://github.com/${info.github_url}`}>{info.github_url}</a>
        </div>
        <div style={{display: 'flex', width: '20vw'}}>
          {info.members.map((el, index) => 
            <div key={index}>{el.first_name}</div>
          )}
        </div>
        <div style={{width: '10vw'}}>
          <input type='checkbox' checked={info.competing}></input>
        </div>
        <div style={{display: 'flex', width: '15vw'}}>
          {info.milestones.map((el, index) => 
            <div key={index}>{el.id}</div>
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '10vw'}}>
          <div style={iconStyle} onClick={() => this.showMilestonesSection()}>M</div>
          <div style={iconStyle} onClick={() => this.deleteTeam()}>D</div>
        </div>
      </div>
    );
  }
}

export default TeamEntry;
