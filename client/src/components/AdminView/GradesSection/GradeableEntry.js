import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasSubmission } from "../../../js/teams";
class GradeableEntry extends React.Component {
  // showMilestonesSection = () => {
  //   this.props.showMilestonesSection();
  // };

  render() {
    const { num, team, milestones } = this.props;

    return (
      <div className="gradeSection-teamBlock u-positionRelative">
        <div className="gradeSection-teamName">{team.team_name}</div>
        <span className="gradeSection-teamNum">#{num}</span>
        <div>
          {milestones.map((milestone, index) => (
            <div
              className={classnames(
                "u-flex",
                "u-flexJustifyBetweeen",
                "gradeSection-milestoneContainer",
                { "gradeSection-milestoneContainer--submitted": hasSubmission(team, milestone._id) }
              )}
              key={`${team.team_name}-ms-${index}`}
            >
              <div>{milestone.title}</div>
              <div className="u-flex">
                {hasSubmission(team, milestone._id) && (
                  <FontAwesomeIcon
                    icon={["fas", "share-square"]}
                    size="s"
                    className="u-pointer u-marginRight-sm"
                    onClick={() => this.props.showMilestonesSection(team._id)}
                  />
                )}
                <div
                  className={classnames(
                    "gradeSection-milestoneCheckbox",
                    "u-flex",
                    "u-flexJustifyCenter",
                    "u-flexAlignCenter",
                    {
                      "gradeSection-milestoneCheckbox--checked": hasSubmission(team, milestone._id),
                    }
                  )}
                >
                  {hasSubmission(team, milestone._id) && (
                    <FontAwesomeIcon icon={["fas", "check"]} size="xs" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GradeableEntry;
