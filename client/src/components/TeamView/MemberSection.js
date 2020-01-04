import React from "react";
import { Redirect } from "react-router-dom";

import { removeMember } from "../../js/teams";

import Modal from "../ui/Modal";
import { post } from "../../utils";

class MemberSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      showModal: false,
      redirect: false,
    };
  }

  setShowModal = (val) => {
    this.setState({ showModal: val });
  };

  askLeaveTeam = () => {
    this.setState({ showModal: true });
  };

  leaveTeam = (team, user) => {
    removeMember(team._id, user._id);
    this.setState({ redirect: true });
  };

  lockTeam = (team) => {
    // post("/:team_id/generate-github")
  };

  render() {
    const { currentTeam, currentUser } = this.props;
    const { github_url } = currentTeam;

    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {!github_url && (
          <div className="u-grey">
            When your team has all its members, press the <span className="u-black">lock team</span>{" "}
            button. Locked in teams will get their shared Github repository generated.
          </div>
        )}
        {github_url && (
          <div>
            <a className="u-pink" href={github_url}>
              {github_url}
            </a>
          </div>
        )}
        <div className="u-marginBottom-xxl u-marginTop-xl">
          {currentTeam.members.map((userObj) => (
            <div className="u-marginBottom-sm" key={userObj._id}>
              {userObj.first_name + " " + userObj.last_name}
            </div>
          ))}
        </div>

        {!github_url && (
          <div className="StudentView-buttonHolder">
            <span className="StudentView-button--primary">lock team</span>
            <span className="StudentView-button--secondary" onClick={this.askLeaveTeam}>
              leave team
            </span>
          </div>
        )}

        <Modal show={this.state.showModal} setShow={this.setShowModal}>
          <h2 className="Modal-header">Are you sure you want to leave your team?</h2>
          <div className="StudentView-buttonHolder u-textRight">
            <span
              className="StudentView-button--primary"
              onClick={() => this.leaveTeam(currentTeam, currentUser)}
            >
              Confirm
            </span>
            <span
              className="StudentView-button--secondary"
              onClick={() => this.setShowModal(false)}
            >
              Cancel
            </span>
          </div>
        </Modal>
      </>
    );
  }
}

export default MemberSection;
