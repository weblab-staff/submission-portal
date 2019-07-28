import React from "react";
import { post } from "../../../../utils";

class SettingsTeamSize extends React.Component {
  updateCap = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    post(`/api/class/${this.props.classId}/team_size_cap`, {
      team_size_cap: value,
    })
      .then((status) => {
        if (status === 204) {
          this.props.refresh();
        }
        return "You fucked up";
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          width: "40vw",
          height: "20vh",
          border: "1px solid black",
          margin: "1vh 1vw",
        }}
      >
        <div>Team Size Cap:</div>
        <select value={this.props.cap} onChange={this.updateCap}>
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
    );
  }
}

export default SettingsTeamSize;
