import React from "react";
import { post } from "../../../../utils";

class SettingsRegistration extends React.Component {
  toggleRegistration = () => {
    post(`/api/class/${this.props.classId}/registration`, {
      registration_open: !this.props.regOpen,
    })
      .then((status) => {
        if (status === 204) {
          this.props.refresh();
        }
        return "You fuked up";
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { regOpen } = this.props;

    return (
      <div
        style={{
          width: "40vw",
          height: "20vh",
          border: "1px solid black",
          margin: "1vh 1vw",
        }}
      >
        <div>Registration</div>
        <div style={{ display: "flex" }}>
          <div>{regOpen ? "Open" : "Closed"}</div>
          <button onClick={this.toggleRegistration}>Turn {regOpen ? "off" : "on"}</button>
        </div>
      </div>
    );
  }
}

export default SettingsRegistration;
