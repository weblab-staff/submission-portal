import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import Switch from "./../../Switch";
import {
  dropStudents,
  removeTag,
  addTag,
  toggleCredit,
} from "../../../../js/students";
class StudentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: "",
    };
  }

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

  handleChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      tag: value,
    });
  };

  showTagInput = () => {
    this.setState({
      addingTag: true,
    });
  };

  addTagAndUpdateState = () => {
    addTag([this.props.info], this.state.tag);
    this.setState({ addingTag: false });
  };

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: "",
    });
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
      <div className={`studentEntry-container`}>
        <div>
          <input
            type="checkbox"
            checked={selected}
            onChange={this.toggleSelection}
          />
        </div>
        <div>{info.first_name}</div>
        <div>{info.last_name}</div>
        <div>
          <a href={`https://github.com/${info.github_username}`}>
            {info.github_username}
          </a>
        </div>
        <div>{info.team ? info.team.team_name : "undefined"}</div>
        <div>
          <Switch
            checked={info.for_credit}
            onChange={() => toggleCredit([this.props.info])}
          />
        </div>
        <div className="u-flex">
          {info.tags.map((tag, index) => (
            <div key={index} className="u-flex u-marginRight-sm">
              <div className="studentEntry-tag">{tag}</div>
              <button
                className="studentEntry-tagDelete u-pointer"
                onClick={() => removeTag([this.props.info], tag)}
              >
                <FontAwesomeIcon icon={["fas", "times"]} size="sm" />
              </button>
            </div>
          ))}
          {this.state.addingTag ? (
            <div>
              <input type="text" onChange={this.handleChange} />
              <button onClick={this.hideTagInput}>cancel</button>
              <button onClick={this.addTagAndUpdateState}>add</button>
            </div>
          ) : (
            <button onClick={this.showTagInput}>+</button>
          )}
        </div>
        <div className="u-flex u-flexJustifyEnd">
          <div
            className="u-pointer u-marginRight-lg studentEntry-icon"
            onClick={this.showInfoModal}
          >
            <FontAwesomeIcon icon={["fas", "info"]} size="sm" />
          </div>
          <div
            className="u-pointer u-marginRight-lg studentEntry-icon"
            onClick={() => this.showMilestonesSection()}
          >
            <FontAwesomeIcon icon={["fas", "file-alt"]} size="sm" />
          </div>
          <div
            className="u-pointer u-marginRight-lg studentEntry-icon"
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
