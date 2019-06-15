import React from "react";

class StudentListHeader extends React.Component {
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
        <div style={{width: '10vw'}}>
          <div>First Name</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>Last Name</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>GitHub</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>Team</div>
        </div>
        <div style={{width: '5vw'}}>
          <div>Credit</div>
        </div>
        <div style={{width: '15vw'}}>
          <div>Tags</div>
        </div>
      </div>
    );
  }
}

export default StudentListHeader;
