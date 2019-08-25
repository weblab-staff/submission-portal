import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import { hasSubmission } from "../../../../js/teams";

import TagList from "./../../Tag";
import Switch from "./../../Switch";

class TeamEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
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

  addMember = (member) => {
    console.log("TODO: This isn't implemeneted");
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
    if (confirm(`Are you sure you want to delete ${this.props.info.team_name}?`)) {
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
          <input type="checkbox" checked={selected} onChange={this.toggleSelection} />
        </div>
        <div>{info.team_name}</div>
        <div>
          <a href={info.github_url}>{info.github_url ? info.github_url.substring(27) : "-"}</a>
        </div>
        <TagList
          tags={info.members}
          displayTags={info.members.map((member) => `${member.first_name} ${member.last_name}`)}
          add={(member) => {
            this.addMember(member);
          }}
          remove={(member) => this.removeMember(member)}
        />
        <div>
          <Switch checked={info.competing} onChange={this.toggleCompeting} />
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div
              key={`ms-progress-${index}`}
              className={`u-flex u-flexCenter teamEntry-progress ${hasSubmission(
                info,
                milestone._id
              ) && "teamEntry-progress--complete"}`}
            >
              {index}
            </div>
          ))}
        </div>
        <div className="u-flex u-flexJustifyEnd">
          <div
            className="u-pointer u-marginRight-lg entry-icon"
            onClick={this.showMilestonesSection}
          >
            <FontAwesomeIcon icon={["fas", "file-alt"]} size="sm" />
          </div>
          <div className="u-pointer u-marginRight-lg entry-icon" onClick={this.deleteTeam}>
            <FontAwesomeIcon icon={["fas", "trash"]} size="sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default TeamEntry;
