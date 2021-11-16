import React from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { removeMember } from "../../js/teams";

import "./MemberSection.css";

import Modal from "../ui/Modal";
import { post } from "../../utils";

class MemberSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      showLockModal: false,
      showLeaveModal: false,
      redirect: false,
      competing: props.currentTeam.competing,
      editingCompeting: false,
      githubLoading: false,
      githubError: false,
    };
  }

  isTeamLead = (team, user) => {
    return team.members.length > 0 && team.members[0]._id === user._id;
  };

  setShowLockModal = (val) => {
    this.setState({ showLockModal: val });
  };

  setShowLeaveModal = (val) => {
    this.setState({ showLeaveModal: val });
  };

  askLeaveTeam = () => {
    this.setState({ showLeaveModal: true });
  };

  askLockTeam = () => {
    this.setState({ showLockModal: true });
  };

  leaveTeam = (team, user) => {
    removeMember(team._id, user._id);
    this.setState({ redirect: true });
  };

  lockTeam = (team) => {
    this.setState({ githubLoading: true });
    post(`/api/teams/${this.props.currentTeam._id}/generate-github`)
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ githubError: true });
      });
  };

  toggleEditingCompeting = () => {
    this.setState({ editingCompeting: !this.state.editingCompeting });
  };

  handleEditingSelect = (event) => {
    this.toggleEditingCompeting();
    post(`/api/teams/${this.props.currentTeam._id}/set-competing`, {
      competing: event.target.value,
    })
      .then((_res) => {
        this.setState({ competing: !this.state.competing });
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCompeting = () => {
    const { competing, editingCompeting } = this.state;

    if (editingCompeting) {
      return (
        <div className="u-marginTop-xl u-flex u-flexAlignCenter">
          Your team is currently set to:{" "}
          <div className="u-positionRelative">
            <div className="MemberSection-select--arrow">
              <select
                className="MemberSection-select"
                value={competing}
                onChange={this.handleEditingSelect}
              >
                <option value="true">competing</option>
                <option value="false">not competing</option>
              </select>
            </div>
          </div>
          <FontAwesomeIcon
            className="u-marginLeft-md u-pointer"
            icon={["fas", "times"]}
            size="1x"
            onClick={this.toggleEditingCompeting}
          />
        </div>
      );
    } else {
      return (
        <div className="u-marginTop-xl">
          Your team is currently set to:{" "}
          <span className="u-pink u-bold">{competing ? "competing" : "not competing"}</span>
          <FontAwesomeIcon
            className="u-marginLeft-md u-pointer"
            icon={["fas", "edit"]}
            size="1x"
            onClick={this.toggleEditingCompeting}
          />
        </div>
      );
    }
  };

  render() {
    const { currentTeam, currentUser } = this.props;
    const { github_url } = currentTeam;

    if (this.state.redirect) {
      return <Navigate to="/" />;
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
        {this.renderCompeting()}
        <div className="u-marginBottom-xxl u-marginTop-xl">
          {currentTeam.members.map((userObj) => (
            <div className="MemberSection-member u-marginBottom-sm" key={userObj._id}>
              {userObj.first_name + " " + userObj.last_name}
            </div>
          ))}
        </div>

        {!github_url && (
          <div className="StudentView-buttonHolder">
            {this.isTeamLead(currentTeam, currentUser) && (
              <span className="StudentView-button--primary" onClick={this.askLockTeam}>
                lock team
              </span>
            )}
            <span className="StudentView-button--secondary" onClick={this.askLeaveTeam}>
              leave team
            </span>
          </div>
        )}

        <Modal show={this.state.showLockModal} setShow={this.setShowLockModal}>
          <h2 className="Modal-header">Are you sure you want to lock your team?</h2>
          <div className="StudentView-buttonHolder u-textRight">
            {this.state.githubLoading ? (
              this.state.githubError ? (
                <span>
                  Error! Failed to create your GitHub repository. This probably means your team name
                  is invalid or conflicts with a team from a previous year. Please contact
                  weblab-staff@mit.edu.
                </span>
              ) : (
                <span>Creating GitHub repository...</span>
              )
            ) : (
              <>
                <span
                  className="StudentView-button--primary"
                  onClick={() => this.lockTeam(currentTeam)}
                >
                  Confirm
                </span>
                <span
                  className="StudentView-button--secondary"
                  onClick={() => this.setShowLockModal(false)}
                >
                  Cancel
                </span>
              </>
            )}
          </div>
        </Modal>

        <Modal show={this.state.showLeaveModal} setShow={this.setShowLeaveModal}>
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
              onClick={() => this.setShowLeaveModal(false)}
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
