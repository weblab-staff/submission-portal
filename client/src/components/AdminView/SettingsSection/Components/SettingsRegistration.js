import React from "react";
import { get } from "../../../../utils";

class SettingsRegistration extends React.Component {
  toggleRegistration = () => {
    console.log('toggling reg')
  }

  render() {
    return (
      <div style={{width: '40vw', height: '20vh', border: '1px solid black', margin: '1vh 1vw'}}>
        <div>Registration</div>
        <div style={{display: 'flex'}}>
          <div>Currently accepting</div>
          <button onClick={this.toggleRegistration}>Turn off</button>
        </div>
      </div>
    );
  }
}

export default SettingsRegistration;