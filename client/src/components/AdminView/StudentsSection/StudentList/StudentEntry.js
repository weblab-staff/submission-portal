import React from "react";

class StudentEntry extends React.Component {
  showInfoModal = () => {
    console.log(`Showing info modal for ${this.props.info.first_name}`);
  }

  showMilestonesSection = () => {
    console.log(`Showing milestones for ${this.props.info.first_name}`);
  }

  deleteStudent = () => {
    if (confirm(`Are you sure you want to delete ${this.props.info.first_name}?`)) {
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
        <div style={{width: '10vw'}}>
          <div>{info.first_name}</div>
        </div>
        <div style={{width: '10vw'}}>
          <div>{info.last_name}</div>
        </div>
        <div style={{width: '10vw'}}>
          <a href={`https://github.com/${info.github_url}`}>{info.github_url}</a>
        </div>
        <div style={{width: '10vw'}}>
          <div>{info.team}</div>
        </div>
        <div style={{width: '5vw'}}>
          <input type='checkbox' checked={info.for_credit}></input>
        </div>
        <div style={{display: 'flex', width: '25vw'}}>
          {info.tags.map((el, index) => 
            <div key={index}>{el}</div>
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '10vw'}}>
          <div style={iconStyle} onClick={() => this.showInfoModal()}>I</div>
          <div style={iconStyle} onClick={() => this.showMilestonesSection()}>M</div>
          <div style={iconStyle} onClick={() => this.deleteStudent()}>D</div>
        </div>
      </div>
    );
  }
}

export default StudentEntry;
