import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import Switch from "./../../Switch";
import TagList from "./../../Tag";
import { dropStudents, toggleCredit, addTag, removeTag } from "../../../../js/students";
class StudentEntry extends React.Component {
  showInfoModal = () => {
    this.props.showInfoModal(this.props.info);
  };

  showMilestonesSection = () => {
    if (this.props.info.team) {
      this.props.showMilestonesSection(this.props.info.team._id);
    } else {
      console.log("no team");
    }
  };

  toggleSelection = () => {
    if (this.props.selected) {
      this.props.deselectStudent(this.props.info);
    } else {
      this.props.selectStudent(this.props.info);
    }
  };

  render() {
    const { info, selected } = this.props;

    return (
      <div className="studentEntry-container">
        <div>
          <input type="checkbox" checked={selected} onChange={this.toggleSelection} />
        </div>
        <div>{info.first_name}</div>
        <div>{info.last_name}</div>
        <div>
          <a href={`https://github.com/${info.github_username}`}>{info.github_username}</a>
        </div>
        <div>{info.team ? info.team.team_name : "-"}</div>
        <div>
          <Switch checked={info.for_credit} onChange={() => toggleCredit([this.props.info])} />
        </div>
        <TagList
          tags={info.tags}
          add={(tag) => addTag([this.props.info], tag)}
          remove={(tag) => removeTag([this.props.info], tag)}
        />
        <div className="u-flex u-flexJustifyEnd">
          <div className="u-pointer u-marginRight-lg entry-icon" onClick={this.showInfoModal}>
            <FontAwesomeIcon icon={["fas", "info"]} size="sm" />
          </div>
          <div
            className="u-pointer u-marginRight-lg entry-icon"
            onClick={() => this.showMilestonesSection()}
          >
            <FontAwesomeIcon icon={["fas", "file-alt"]} size="sm" />
          </div>
          <div
            className="u-pointer u-marginRight-lg entry-icon"
            onClick={() => dropStudents([this.props.info])}
          >
            <FontAwesomeIcon icon={["fas", "trash"]} size="sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentEntry;
