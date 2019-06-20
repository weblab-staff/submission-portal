import React from "react";

class StudentInfoModal extends React.Component {
  render() {
    const { info } = this.props;

    const styles = {
      border: '1px solid black',
      background: 'white',
      position: 'absolute',
      left: '40vw',
      top: '10vh',
      width: '300px',
      height: '300px',
      zIndex: '2'
    }

    return (
      <div style={styles}>
        <div>Info</div>
        <div>
          <span>first name</span>
          <span>{info.first_name}</span>
        </div>
        <div>
          <span>last name</span>
          <span>{info.last_name}</span>
        </div>
        <div>
          <span>github id</span>
          <span>{info.github_username}</span>
        </div>
        <div>
          <span>email</span>
          <span>{info.email}</span>
        </div>
        <div>
          <span>living group</span>
          <span>{info.statistics.living_group}</span>
        </div>
        <div>
          <span>gender</span>
          <span>{info.statistics.gender}</span>
        </div>
        <div>
          <span>team</span>
          <span>{info.team ? info.team.team_name : '???'}</span>
        </div>
        <div>
          <span>experience</span>
          <span>{info.statistics.experience}</span>
        </div>
        <div>
          <span>for credit</span>
          <span>{info.for_credit ? info.for_credit.toString() : 'idk'}</span>
        </div>
        <div>
          <span>tags</span>
          <div>
            {info.tags.map((el, index) => 
              <div key={index}>{el}</div>
            )}
          </div>
        </div>
        <button onClick={this.props.hideInfoModal}>close</button>
      </div>
    );
  }
}

export default StudentInfoModal;
