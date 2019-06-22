import React from "react";

class EmailModal extends React.Component {
  sendEmail = () => {
    console.log('sending email');
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
          <input type='text'></input>
        </div>
        <div>
          <textarea></textarea>
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
