import React from "react";
import SettingsMilestones from "./SettingsMilestones";

class SettingsBody extends React.Component {
  render() {
    return (
      <div style={{marginLeft: '50px'}}>
        <SettingsMilestones year={this.props.year} />
        <div style={{display: 'flex', width: '82vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>Admins</div>
        <div style={{display: 'flex'}}>
          <div style={{display: 'flex', width: '40vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>
            <div>Team Size Cap:</div>
            <select value="4">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div style={{width: '40vw', height: '20vh', border: '1px solid black', margin: '1vh 1vw'}}>
            <div>Registration</div>
            <div style={{display: 'flex'}}>
              <div>Currently accepting</div>
              <button>Turn off</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsBody;
