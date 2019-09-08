import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import { hasSubmission, addMember, removeMember } from "../../../../js/teams";

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
      this.props.deselectTeam(this.props.team);
    } else {
      this.props.selectTeam(this.props.team);
    }
  };

  showMilestonesSection = () => {
    if (this.props.team) {
      this.props.showMilestonesSection(this.props.team._id);
    } else {
      console.log("cannot show milestone section, no team._id");
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

  toggleCompeting = () => {
    const { _id, competing } = this.props.team;
    post(`/api/teams/${_id}/set-competing`, { competing: !competing })
      .then((status) => {
        if (status === 204) {
          alert("toggled competing, please refresh");
        } else {
          console.log("you fuked up");
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTeam = () => {
    if (confirm(`Are you sure you want to delete ${this.props.team.team_name}?`)) {
      const { _id } = this.props.team;
      delet(`/api/teams/${_id}`)
        .then((status) => {
          if (status === 204) {
            alert("deleted team, please refresh");
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
    const { team, milestones, selected, students } = this.props;

    return (
      <div className="teamEntry-container">
        <div>
          <input type="checkbox" checked={selected} onChange={this.toggleSelection} />
        </div>
        <div>{team.team_name}</div>
        <div>
          <a href={team.github_url}>{team.github_url ? team.github_url.substring(27) : "-"}</a>
        </div>
        <TagList
          tags={team.members}
          displayTags={team.members.map((member) => `${member.first_name} ${member.last_name}`)}
          add={(userId) => {
            addMember(this.props.team._id, userId);
          }}
          datalist={students.reduce((data, studentObj) => {
            data[studentObj._id] = `${studentObj.first_name} ${studentObj.last_name}`;
            return data;
          }, {})}
          remove={(member) => removeMember(this.props.team._id, member._id)}
        />
        <div>
          <Switch checked={team.competing} onChange={this.toggleCompeting} />
        </div>
        <div>
          {milestones.map((milestone, index) => (
            <div
              key={`ms-progress-${index}`}
              className={`u-flex u-flexCenter teamEntry-progress ${hasSubmission(
                team,
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
