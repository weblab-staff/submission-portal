import React from "react";

class TeamListHeader extends React.Component {
  render() {
    const styles = {
      display: 'flex',
      alignItems: 'center',
      margin: '3px 40px',
      padding: '5px',
    }

    return (
      <div style={styles}>
        <div style={{width: '3vw'}}>
          <input type='checkbox'></input>
        </div>
        <div style={{width: '15vw'}}>
          <div>Team Name</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>GitHub</div>
        </div>
        <div style={{width: '20vw'}}>
          <div>Members</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>Competing?</div>
        </div>
        <div style={{width: '15vw'}}>
          <div>Progress</div>
        </div>
      </div>
    );
  }
}

export default TeamListHeader;
