import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import Switch from "./../../Switch";
import TagList from "./../../Tag";
import { dropStudents, toggleCredit, addTag, removeTag } from "../../../../js/students";
class StudentEntry extends React.Component {
  showInfoModal = () => {
    this.props.showInfoModal(this.props.student);
  };

  showMilestonesSection = () => {
    if (this.props.student.team) {
      this.props.showMilestonesSection(this.props.student.team._id);
    } else {
      console.log("no team");
    }
  };

  toggleSelection = () => {
    if (this.props.selected) {
      this.props.deselectStudent(this.props.student);
    } else {
      this.props.selectStudent(this.props.student);
    }
  };

  render() {
    const { student, selected } = this.props;

    return (
      <div className="studentEntry-container">
        <div>
          <input type="checkbox" checked={selected} onChange={this.toggleSelection} />
        </div>
        <div>{student.first_name}</div>
        <div>{student.last_name}</div>
        <div>
          <a href={`https://github.com/${student.github_username}`}>{student.github_username}</a>
        </div>
        <div>{student.team ? student.team.team_name : "-"}</div>
        <div>
          <Switch
            checked={student.for_credit}
            onChange={() => toggleCredit([this.props.student])}
          />
        </div>
        <TagList
          tags={student.tags}
          add={(tag) => addTag([this.props.student], tag)}
          remove={(tag) => removeTag([this.props.student], tag)}
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
            onClick={() => dropStudents([this.props.student])}
          >
            <FontAwesomeIcon icon={["fas", "trash"]} size="sm" />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentEntry;
