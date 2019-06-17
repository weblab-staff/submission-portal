import React from "react";

class SettingsAdmin extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', width: '82vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>
        <div>Admins</div>
        <div>
          <textarea></textarea>
        </div>
      </div>
    );
  }
}

export default SettingsAdmin;