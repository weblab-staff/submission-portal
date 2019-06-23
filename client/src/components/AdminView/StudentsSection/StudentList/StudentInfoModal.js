import React from "react";
import { post, delet } from "../../../../utils";

class StudentInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: '',
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

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: '',
    })
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
        <button onClick={this.props.hideInfoModal}>close</button>
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
          <span>{info.for_credit.toString()}</span>
        </div>
        <div>
          <span>tags</span>
          <div>
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
        </div>
      </div>
    );
  }
}

export default StudentInfoModal;
