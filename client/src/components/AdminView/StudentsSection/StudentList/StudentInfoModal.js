import React from "react";
import { post, delet } from "../../../../utils";

import "./StudentInfoModal.css";

class StudentInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: "",
    };
  }

  handleChange = (event) => {
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

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: "",
    });
  };

  addTag = () => {
    const { _id } = this.props.info;
    post(`/api/users/${_id}/tag`, { tag: this.state.tag })
      .then((status) => {
        if (status === 204) {
          this.setState({
            addingTag: false,
            tag: "",
          });
          this.props.refresh();
        } else {
          console.log("you fuked up");
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTag = (tag) => {
    const { _id } = this.props.info;
    delet(`/api/users/${_id}/tag`, { tag })
      .then((status) => {
        if (status === 204) {
          this.props.refresh();
        } else {
          console.log("you fuked up");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { info } = this.props;

    return (
      <div className="StudentInfoModal-container">
        <button onClick={this.props.hideInfoModal}>close</button>
        <h2>Info</h2>
        <div>
          <span className="StudentInfoModal-label">first name</span>
          <span>{info.first_name}</span>
        </div>
        <div>
          <span className="StudentInfoModal-label">last name</span>
          <span>{info.last_name}</span>
        </div>
        <div>
          <span className="StudentInfoModal-label">github id</span>
          <span>{info.github_username}</span>
        </div>
        <div>
          <span className="StudentInfoModal-label">email</span>
          <span>{info.email}</span>
        </div>
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">living group</span>
            <span>{info.statistics.living_group}</span>
          </div>
        )}
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">pronouns</span>
            <span>{info.statistics.pronouns}</span>
          </div>
        )}
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">class year</span>
            <span>{info.statistics.class_year}</span>
          </div>
        )}
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">pronouns</span>
            <span>{info.statistics.pronouns}</span>
          </div>
        )}
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">mit id</span>
            <span>{info.statistics.mit_id}</span>
          </div>
        )}
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">kerb</span>
            <span>{info.statistics.kerb}</span>
          </div>
        )}
        <div>
          <span className="StudentInfoModal-label">team</span>
          <span>{info.team ? info.team.team_name : "???"}</span>
        </div>
        {info.statistics && (
          <div>
            <span className="StudentInfoModal-label">experience</span>
            <span>{info.statistics.experience}</span>
          </div>
        )}
        <div>
          <span className="StudentInfoModal-label">for credit</span>
          <span>{info.for_credit.toString()}</span>
        </div>
        <div>
          <span>tags</span>
          <div>
            {info.tags.map((tag, index) => (
              <div key={index} style={{ border: "1px solid black", borderRadius: "3px" }}>
                <span>{tag}</span>
                <button onClick={() => this.deleteTag(tag)}>X</button>
              </div>
            ))}
            {this.state.addingTag ? (
              <div>
                <input type="text" onChange={this.handleChange} />
                <button onClick={this.hideTagInput}>cancel</button>
                <button onClick={this.addTag}>add</button>
              </div>
            ) : (
              <button onClick={this.showTagInput}>+</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default StudentInfoModal;
