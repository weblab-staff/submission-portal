import React from "react";
import Feedback from "./Feedback";
import Switch from "../Switch";
import { manualCredit } from "../../../js/teams";

class MilestoneDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubmission: 0,
    };
  }

  componentDidMount() {
    const { team, milestone } = this.props;
    if (!milestone) return;

    const submissions = team.submissions[milestone._id];
    if (!submissions || !submissions.length) return;
    this.setState({ selectedSubmission: submissions.length - 1 });
  }

  selectSubmission = (index) => {
    this.setState({ selectedSubmission: index });
  };

  render() {
    const { team, milestone } = this.props;

    if (!milestone) {
      return (
        <div className="u-marginTop-xxxl u-marginLeft-lg u-marginRight-lg">
          No milestone selected!
        </div>
      );
    }

    const submissions = team.submissions[milestone._id];
    if (!milestone.autograde) {
      return (
        <div className="u-marginTop-xxxl u-marginLeft-lg u-marginRight-lg">
          <div className="milestone-title u-marginBottom-md">{milestone.title}</div>
          <div>No Auto-grade Results!</div>
          <div>
            <div>Manual credit status below</div>
            <Switch
              checked={submissions && submissions.length > 0}
              onChange={() => manualCredit(team, milestone)}
            />
          </div>
        </div>
      );
    }

    if (!submissions || submissions.length === 0) {
      return (
        <div className="u-marginTop-xxxl u-marginLeft-lg u-marginRight-lg">No submissions!</div>
      );
    }

    const submission = submissions[this.state.selectedSubmission];

    return (
      <div className="milestone-container u-marginTop-xxxl u-marginLeft-lg u-marginRight-lg">
        <div>
          <div className="milestone-title u-marginBottom-md">{milestone.title}</div>
          <div className="u-flex u-marginBottom-xxxl">
            {submissions.map((_, index) => (
              <div
                className={`milestone-submissionOption u-pointer u-marginRight-lg ${
                  index == this.state.selectedSubmission ? "u-bold" : ""
                }`}
                key={`submission-${index}`}
                onClick={() => this.selectSubmission(index)}
              >{`Submission ${index}`}</div>
            ))}
          </div>
          <div>
            {Object.keys(submission.form_response).map((el, index) => (
              <div className="u-marginBottom-lg" key={`response-item-${index}`}>
                <div className="milestone-question u-marginBottom-sm">{el}</div>
                <div className="milestone-answer">{submission.form_response[el]}</div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <Feedback team={team} submission={submission} />
      </div>
    );
  }
}

export default MilestoneDetails;
