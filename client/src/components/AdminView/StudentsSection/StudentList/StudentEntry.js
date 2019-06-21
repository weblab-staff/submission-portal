import React from "react";
import { get, post, delet } from "../../../../utils";

class StudentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: '',
    }
  }

  toggleCredit = () => {
    const { _id, for_credit } = this.props.info;
    post(`/api/users/${_id}/update`, {for_credit: !for_credit})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  showInfoModal = () => {
    this.props.showInfoModal(this.props.info);
  }

  showMilestonesSection = () => {
    console.log(`Showing milestones for ${this.props.info.first_name}`);
  }

  deleteStudent = () => {
    if (confirm(`Are you sure you want to delete ${this.props.info.first_name}?`)) {
      const { _id } = this.props.info;
      delet(`/api/users/${_id}`)
      .then(status => {
        if (status === 204) {
          console.log('nice');
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
    } else {
      console.log('NOT deleting');
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      tag: value,
    });
  }

  showTagInput = () => {
    this.setState({
      addingTag: true
    });
  }

  addTag = () => {
    const { _id } = this.props.info;
    post(`/api/users/${_id}/tag`, {tag: this.state.tag})
      .then(status => {
        if (status === 204) {
          this.setState({
            addingTag: false,
            tag: '',
          })
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  deleteTag = (tag) => {
    const { _id } = this.props.info;
    delet(`/api/users/${_id}/tag`, {tag})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: '',
    })
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
          <a href={`https://github.com/${info.github_username}`}>{info.github_username}</a>
        </div>
        <div style={{width: '10vw'}}>
          <div>{info.team ? info.team.team_name : '???'}</div>
        </div>
        <div style={{width: '5vw'}}>
          <input type='checkbox' checked={info.for_credit} onChange={this.toggleCredit}></input>
        </div>
        <div style={{display: 'flex', width: '25vw'}}>
          {info.tags.map((tag, index) => 
            <div key={index} style={{border: '1px solid black', borderRadius: '3px'}}>
              <span>{tag}</span>
              <button onClick={() => this.deleteTag(tag)}>X</button>
            </div>
          )}
          {this.state.addingTag ?
            <div>
              <input type="text" onChange={this.handleChange}></input>
              <button onClick={this.hideTagInput}>cancel</button>
              <button onClick={this.addTag}>add</button>
            </div> :
            <button onClick={this.showTagInput}>+</button>
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '10vw'}}>
          <div style={iconStyle} onClick={this.showInfoModal}>I</div>
          <div style={iconStyle} onClick={() => this.showMilestonesSection()}>M</div>
          <div style={iconStyle} onClick={this.deleteStudent}>D</div>
        </div>
      </div>
    );
  }
}

export default StudentEntry;
