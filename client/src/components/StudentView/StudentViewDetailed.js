import React from "react";

import Back from "../ui/Back";

import "./StudentViewDetailed.css";

/**
 * Props
 * @param data
 */
class Submission extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, autograde } = this.props;

    if (!autograde) {
      return (
        <div className="Submission-part">
          <div className="Submission-prompt">{data}</div>
        </div>
      );
    }

    return (
      <div className="Submission-container">
        {Object.keys(data).map((k) => {
          return (
            <div className="Submission-part">
              <div className="Submission-prompt">{k}</div>
              <div className="Submission-answer">{data[k]}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

class StudentViewDetailed extends React.Component {
  formatDate = (date, withDay = false) => {
    let options = { weekday: "long" };
    let d = new Date(date);
    if (withDay) {
      return `${d.toLocaleDateString("en-US", options)} ${d.toLocaleDateString("en-US")}`;
    }
    return d.toLocaleDateString("en-US");
  };

  render() {
    const { toggleView, milestone, submissions } = this.props;
    if (!submissions) {
      toggleView(-1);
    }

    return (
      <div className="u-positionRelative">
        <Back absolute trigger={() => toggleView(-1)} />
        <div className="u-flex">
          <div className="StudentViewDetail-headContainer">
            <h1 className="StudentViewDetail-header">{milestone.title}</h1>
            <div className="StudentViewDetail-subheader">
              {submissions.length !== 0
                ? `viewing latest submission from: ${this.formatDate(
                    submissions[submissions.length - 1].timestamp
                  )}`
                : "your team hasn't submitted anything for this milestone yet!"}
            </div>
          </div>
          <div className="StudentViewDetail-buttonHolder">
            {milestone.handin_link && (
              <a className="StudentView-button--primary" href={milestone.handin_link}>
                resubmit
              </a>
            )}
          </div>
        </div>
        <Submission
          data={submissions[submissions.length - 1].form_response}
          autograde={milestone.autograde}
        />
      </div>
    );
  }
}

export default StudentViewDetailed;
