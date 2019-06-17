import React from "react";
import SettingsMilestones from "./Components/SettingsMilestones";
import SettingsAdmin from "./Components/SettingsAdmin";
import SettingsTeamSize from "./Components/SettingsTeamSize";
import SettingsRegistration from "./Components/SettingsRegistration";
import { get } from "../../../utils";

class SettingsBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      info: null,
    }
  }

  componentDidMount() {
    this.getClassInfo();
  }

  getClassInfo = () => {
    get('/api/class')
      .then(data => {
        if (data && data.length > 0) {
          this.setState({
            loading: false,
            info: data[0],
          })
        } else {
          this.setState({
            loading: false,
          })
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loading, info } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      );
    }

    if (!info) {
      return (
        <div>
          No info!
        </div>
      );
    }

    return (
      <div style={{marginLeft: '50px'}}>
        <SettingsMilestones year={this.props.year} />
        <SettingsAdmin admins={info.admins}/>
        <div style={{display: 'flex'}}>
          <SettingsTeamSize cap={info.team_size_cap}/>
          <SettingsRegistration />
        </div>
      </div>
    );
  }
}

export default SettingsBody;
