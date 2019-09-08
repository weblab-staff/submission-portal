import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import { hasSubmission } from "../../../js/teams";

import "./MilestonesSection.css";

class MilestoneSelector extends React.Component {
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
    const { team, milestones } = this.props;
    console.log(team, milestones);

    return (
      <div className="milestoneSelector-container">
        <div className="u-flex">
          <FontAwesomeIcon
            onClick={this.props.hideMilestonesSection}
            icon={["fas", "arrow-left"]}
            size="1x"
            className="u-pointer milestoneSelector-backIcon"
          />
          <div className="u-marginLeft-lg u-marginBottom-xxxl">
            <div className="milestoneSelector-header">Milestones</div>
            <div className="milestoneSelector-subheader">Team {team.team_name}</div>
          </div>
        </div>

        <div>
          {milestones.map((milestone, index) => (
            <div
              className="u-flex u-pointer u-marginBottom-lg"
              key={`milestone-${index}`}
              onClick={() => this.props.selectMilestone(milestone)}
            >
              {console.log(this.getMilestoneStatus(team, milestone._id))}
              <div
                className={classnames(
                  "milestone-status",
                  "u-marginRight-md",
                  "u-flex",
                  "u-flexCenter",
                  {
                    "milestone-status--submitted":
                      this.getMilestoneStatus(team, milestone) === "submitted",
                    "milestone-status--late": this.getMilestoneStatus(team, milestone) === "late",
                    "milestone-status--waiting":
                      this.getMilestoneStatus(team, milestone) === "waiting",
                  }
                )}
              >
                {this.countSubmissions(team, milestone._id) > 0 && (
                  <FontAwesomeIcon icon={["fas", "check"]} size="sm" />
                )}
              </div>
              <div>
                <div className="u-white milestone-title">{milestone.title}</div>
                <div>
                  <span className="u-white milestone-submissionCount">
                    {this.countSubmissions(team, milestone._id)}
                  </span>{" "}
                  submissions
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MilestoneSelector;
