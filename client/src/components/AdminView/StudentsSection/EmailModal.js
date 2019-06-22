import React from "react";
import { post } from "../../../utils";

class EmailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      body: '',
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });    
  }

  sendEmail = () => {
    post('/api/emails/', {
      students: this.props.selectedStudents.map(el => el._id),
      teams: [],
      subject: this.state.subject,
      body: this.state.body,
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
  }

  render() {
    const { selectedStudents } = this.props;

    const styles = {
      border: '1px solid black',
      borderRadius: '3px',
      background: 'white',
      position: 'absolute',
      right: '10vw',
      bottom: '0',
      width: '300px',
      height: '300px',
      zIndex: '2'
    }

    return (
      <div style={styles}>
        <div>
          To:
          <div style={{display: 'flex'}}>
              {selectedStudents.map((student, index) => 
                <div key={`selected-${index}`}>
                  <span>{student.first_name}</span>
                  <button>X</button>
                </div>
              )}
          </div>
        </div>
        <div>
          Subject:
          <input type='text' name='subject' onChange={this.handleChange}></input>
        </div>
        <div>
          <textarea name='body' onChange={this.handleChange}></textarea>
        </div>
        <div>
          <button onClick={this.props.hideEmailModal}>cancel</button>
          <button onClick={this.sendEmail}>send</button>
        </div>
      </div>
    );
  }
}

export default EmailModal;
