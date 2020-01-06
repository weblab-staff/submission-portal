import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { hasSubmission } from "../../js/teams";

/**
 * Props
 * @param toggleView
 * @param id
 * @param title
 * @param closed
 * @param link
 * @param submissionTime
 * @param deadline
 * @param status team submission status
 * @param {bool} autograde
 */
class StudentMilestone extends React.Component {
  constructor(props) {
    super(props);
  }

  getIconName = (status) => {
    const ICON_MAP = {
      closed: "lock",
      waiting: "wrench",
      submitted: "check",
      late: "exclamation",
    };
    return ICON_MAP[status];
  };

  formatDate = (date, withDay = false) => {
    let options = { weekday: "long" };
    let d = new Date(date);
    if (withDay) {
      return `${d.toLocaleDateString("en-US", options)} ${d.toLocaleDateString("en-US")}`;
    }
    return d.toLocaleDateString("en-US");
  };

  render() {
    const { toggleView } = this.props;
    const { id, title, closed, link, submissionTime, deadline, status, autograde } = this.props;

    return (
      <div
        key={id}
        className={classnames("StudentMilestone-container u-positionRelative", {
          "StudentMilestone-hasSubmissions": submissionTime,
        })}
      >
        <div
          className={classnames("StudentMilestone-body u-flex", { "u-pointer": submissionTime })}
          onClick={() => {
            if (submissionTime) {
              toggleView(id);
            }
          }}
        >
          <div
            className={`StudentMilestone-indicator StudentMilestone-status--${status} u-flex u-flexCenter`}
          >
            <FontAwesomeIcon icon={["fas", this.getIconName(status)]} />
          </div>
          <div className="StudentMilestone-info">
            <div className="StudentMilestone-name">{title}</div>
            <span className="StudentMilestone-due">due {this.formatDate(deadline, true)}</span>
            <span className="StudentMilestone-submitted">
              {submissionTime && `, submitted ${this.formatDate(submissionTime)}`}
            </span>
          </div>
        </div>
        {!closed && !autograde && (
          <div className="u-yellow StudentMilestone-autograde u-positionRelative">
            <FontAwesomeIcon icon={["fas", "hand-paper"]} />
          </div>
        )}
        {!closed && link && (
          <div>
            <a
              className="StudentMilestone-link u-marginLeft-md"
              href={link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={["fas", "share-square"]} />
            </a>
          </div>
        )}
      </div>
    );
  }
}

class StudentViewBroad extends React.Component {
  constructor(props) {
    super(props);
  }

  countSubmissions = (team, id) => {
    if (hasSubmission(team, id)) {
      return team.submissions[id].length;
    }

    return 0;
  };

  getMilestoneStatus = (team, milestone) => {
    if (this.countSubmissions(team, milestone._id) > 0) {
      return "submitted";
    } else if (new Date() <= new Date(milestone.deadline) && !milestone.submission_closed) {
      return "waiting";
    } else if (new Date() > new Date(milestone.deadline) && milestone.submission_closed) {
      return "late";
    }
    return "closed";
  };

  render() {
    const { toggleView, currentTeam, milestones } = this.props;
    return (
      <>
        {milestones.map((mileObj) => {
          return (
            <StudentMilestone
              toggleView={toggleView}
              id={mileObj._id}
              title={mileObj.title}
              closed={mileObj.submission_closed}
              link={mileObj.handin_link}
              submissionTime={
                hasSubmission(currentTeam, mileObj._id) &&
                currentTeam.submissions[mileObj._id].reverse()[0].timestamp
              }
              deadline={mileObj.deadline}
              status={this.getMilestoneStatus(currentTeam, mileObj)}
              autograde={mileObj.autograde}
            />
          );
        })}
      </>
    );
  }
}

export default StudentViewBroad;
