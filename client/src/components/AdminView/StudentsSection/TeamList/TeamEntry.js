import React from "react";
import { post, delet } from "../../../../utils";
import { hasSubmission } from "../../../../js/teams";

import TagList from "./../../Tag";

class TeamEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      addingMember: false,
      member: "",
    };
  }

  toggleSelection = () => {
    if (this.props.selected) {
      this.props.deselectTeam(this.props.info);
    } else {
      this.props.selectTeam(this.props.info);
    }
  };

  showMilestonesSection = () => {
    if (this.props.info) {
      this.props.showMilestonesSection(this.props.info._id);
    } else {
      console.log("no info");
    }
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      member: value,
    });
  };

  showMemberInput = () => {
    this.setState({
      addingMember: true,
    });
  };

  hideMemberInput = () => {
    this.setState({
      addingMember: false,
      member: "",
    });
  };

  removeMember = (member) => {
    const { _id } = this.props.info;
    const user_id = member._id;
    delet(`/api/teams/${_id}/remove-member`, { user_id })
      .then((status) => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log("you fuked up");
        }
      })
      .catch((err) => console.log(err));
  };

  toggleCompeting = () => {
    const { _id, competing } = this.props.info;
    post(`/api/teams/${_id}/set-competing`, { competing: !competing })
      .then((status) => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log("you fuked up");
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTeam = () => {
    if (
      confirm(`Are you sure you want to delete ${this.props.info.team_name}?`)
    ) {
      const { _id } = this.props.info;
      delet(`/api/teams/${_id}`)
        .then((status) => {
          if (status === 204) {
            this.props.refresh();
          } else {
            console.log("you fuked up");
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("NOT deleting");
    }
  };

  render() {
    const { info, milestones, selected } = this.props;

    return (
      <div className="teamEntry-container">
        <div>
          <input
            type="checkbox"
            checked={selected}
            onChange={this.toggleSelection}
          />
        </div>
        <div>{info.team_name}</div>
        <div>
          <a href={info.github_url}>
            {info.github_url ? info.github_url.substring(27) : "undefined"}
          </a>
        </div>
        <div className="u-flex">
          {info.members.map((member, index) => (
            <div
              key={index}
              style={{ border: "1px solid black", borderRadius: "3px" }}
            >
              <span>{`${member.first_name} ${member.last_name}`}</span>
              <button onClick={() => this.removeMember(member)}>X</button>
            </div>
          ))}
          {this.state.addingMember ? (
            <div>
              <input type="text" onChange={this.handleChange} />
              <button onClick={this.hideMemberInput}>cancel</button>
              <button onClick={this.addMember}>add</button>
            </div>
          ) : (
            <button onClick={this.showMemberInput}>+</button>
          )}
        </div>
        <div>
          <input
            type="checkbox"
            checked={info.competing}
            onChange={this.toggleCompeting}
          />
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div key={`ms-progress-${index}`}>
              {hasSubmission(info, milestone._id) ? "[ Y ]" : "[ N ]"}
            </div>
          ))}
        </div>
        <div className="u-flex u-flexJustifyEnd">
          <div onClick={this.showMilestonesSection}>M</div>
          <div onClick={this.deleteTeam}>D</div>
        </div>
      </div>
    );
  }
}

export default TeamEntry;
