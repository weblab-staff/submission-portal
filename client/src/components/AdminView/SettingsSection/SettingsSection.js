import React from "react";
import SettingsHeader from './SettingsHeader';
import SettingsBody from "./SettingsBody";

class SettingsSection extends React.Component {
  render() {
    return (
      <div>
        <SettingsHeader />
        <SettingsBody year={this.props.year}/>
      </div>
    );
  }
}

export default SettingsSection;
