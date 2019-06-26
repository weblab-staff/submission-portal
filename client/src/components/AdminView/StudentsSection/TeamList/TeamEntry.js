import React from "react";
import { post, delet } from "../../../../utils";

class TeamEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingMember: false,
      member: '',
    }
  }

  showMilestonesSection = () => {
    console.log(`Showing milestones for ${this.props.info.team_name}`);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      member: value,
    });
  }

  showMemberInput = () => {
    this.setState({
      addingMember: true
    });
  }

  hideMemberInput = () => {
    this.setState({
      addingMember: false,
      member: '',
    })
  }

  removeMember = (member) => {
    const { _id } = this.props.info;
    const user_id = member._id;
    delet(`/api/teams/${_id}/remove-member`, {user_id})
    .then(status => {
      if (status === 204) {
        this.props.refresh();
      } else {
        console.log('you fuked up');
      }
    })
    .catch(err => console.log(err));
  }

  toggleCompeting = () => {
    const { _id, competing } = this.props.info;
    post(`/api/teams/${_id}/set-competing`, {competing: !competing})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  deleteTeam = () => {
    if (confirm(`Are you sure you want to delete ${this.props.info.team_name}?`)) {
      const { _id } = this.props.info;
      delet(`/api/teams/${_id}`)
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
    } else {
      console.log('NOT deleting');
    }
  }

  submittedMilestone = (team, milestone) => {
    return team.submissions.some(el => el.milestone._id === milestone._id);
  }

  render() {
    const { info, milestones } = this.props;

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
          <a href={info.github_url}>{info.github_url ? info.github_url.substring(27) : "undefined"}</a>
        </div>
        <div style={{display: 'flex', width: '20vw'}}>
          {info.members.map((member, index) => 
            <div key={index} style={{border: '1px solid black', borderRadius: '3px'}}>
              <span>{`${member.first_name} ${member.last_name}`}</span>
              <button onClick={() => this.removeMember(member)}>X</button>
            </div>
          )}
          {this.state.addingMember ?
            <div>
              <input type="text" onChange={this.handleChange}></input>
              <button onClick={this.hideMemberInput}>cancel</button>
              <button onClick={this.addMember}>add</button>
            </div> :
            <button onClick={this.showMemberInput}>+</button>
          }
        </div>
        <div style={{width: '10vw'}}>
          <input type='checkbox' checked={info.competing} onChange={this.toggleCompeting}></input>
        </div>
        <div style={{display: 'flex', width: '15vw'}}>
          {milestones.map((el, index) =>
            <div key={`ms-progress-${index}`}>1-{this.submittedMilestone(info, el) ? 'Y' : 'N'}</div>
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '10vw'}}>
          <div style={iconStyle} onClick={this.showMilestonesSection}>M</div>
          <div style={iconStyle} onClick={this.deleteTeam}>D</div>
        </div>
      </div>
    );
  }
}

export default TeamEntry;
