import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { post, delet } from "../../../../utils";
import {
  dropStudents,
  removeTag,
  addTag,
  toggleCredit
} from "../../../../js/students";
class StudentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: ""
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
      tag: value
    });
  };

  showTagInput = () => {
    this.setState({
      addingTag: true
    });
  };

  addTagAndUpdateState = () => {
    addTag([this.props.info], this.state.tag);
    this.setState({ addingTag: false });
  };

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: ""
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

    const styles = {
      display: "flex",
      alignItems: "center",
      margin: "3px 40px",
      padding: "5px",
      border: "1px solid gray",
      borderRadius: "2px"
    };

    const iconStyle = {
      margin: "0 10px",
      cursor: "pointer"
    };

    return (
      <div style={styles}>
        <div style={{ width: "3vw" }}>
          <input
            type="checkbox"
            checked={selected}
            onChange={this.toggleSelection}
          />
        </div>
        <div style={{ width: "10vw" }}>
          <div>{info.first_name}</div>
        </div>
        <div style={{ width: "10vw" }}>
          <div>{info.last_name}</div>
        </div>
        <div style={{ width: "10vw" }}>
          <a href={`https://github.com/${info.github_username}`}>
            {info.github_username}
          </a>
        </div>
        <div style={{ width: "10vw" }}>
          <div>{info.team ? info.team.team_name : "undefined"}</div>
        </div>
        <div style={{ width: "5vw" }}>
          <input
            type="checkbox"
            checked={info.for_credit}
            onChange={() => toggleCredit([this.props.info])}
          />
        </div>
        <div style={{ display: "flex", width: "25vw" }}>
          {info.tags.map((tag, index) => (
            <div
              key={index}
              style={{ border: "1px solid black", borderRadius: "3px" }}
            >
              <span>{tag}</span>
              <button onClick={() => removeTag([this.props.info], tag)}>
                X
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
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "10vw" }}
        >
          <div style={iconStyle} onClick={this.showInfoModal}>
            <FontAwesomeIcon icon={["fas", "info"]} size="sm" />
          </div>
          <div style={iconStyle} onClick={() => this.showMilestonesSection()}>
            <FontAwesomeIcon icon={["fas", "file-alt"]} size="sm" />
          </div>
          <div
            style={iconStyle}
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
