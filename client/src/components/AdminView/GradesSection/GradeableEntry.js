import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasSubmission, manualCredit, removeCredit } from "../../../js/teams";

class GradeableEntry extends React.Component {
  constructor(props) {
    super(props);
    const checked = {};
    const { team, milestones } = props;
    (milestones || []).forEach((m) => {
      checked[m._id] = hasSubmission(team, m._id);
    });
    this.state = { checked };
  }

  componentDidUpdate(prevProps) {
    // if team or milestones changed, rebuild checked state
    if (prevProps.team !== this.props.team || prevProps.milestones !== this.props.milestones) {
      const checked = {};
      const { team, milestones } = this.props;
      (milestones || []).forEach((m) => {
        checked[m._id] = hasSubmission(team, m._id);
      });
      this.setState({ checked });
    }
  }

  toggleMilestone = (milestone) => {
    const id = milestone._id;
    const { team } = this.props;
    this.setState(
      (prevState) => ({ checked: { ...prevState.checked, [id]: !prevState.checked[id] } }),
      () => {
        // call external functions based on new state
        if (this.state.checked[id]) {
          manualCredit(team, milestone);
        } else {
          removeCredit(team, milestone);
        }
      }
    );
  };

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
          {milestones.map((milestone, index) => {
            const isChecked = !!(this.state.checked && this.state.checked[milestone._id]);
            return (
              <div
                className={classnames(
                  "u-flex",
                  "u-flexJustifyBetweeen",
                  "u-flexAlignCenter",
                  "gradeSection-milestoneContainer",
                  { "gradeSection-milestoneContainer--submitted": isChecked }
                )}
                key={`${team.team_name}-ms-${index}`}
              >
                <div>{milestone.title}</div>
                <div className="u-flex">
                  {isChecked && (
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
                      "u-pointer",
                      {
                        "gradeSection-milestoneCheckbox--checked": isChecked,
                      }
                    )}
                    onClick={() => this.toggleMilestone(milestone)}
                  >
                    {isChecked && <FontAwesomeIcon icon={["fas", "check"]} size="xs" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GradeableEntry;
