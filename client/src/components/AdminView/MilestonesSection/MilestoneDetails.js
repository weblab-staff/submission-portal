import React from "react";
import Feedback from "./Feedback";

class MilestoneDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubmission: 0,
    };
  }

  getSubmissions = (team, milestone) => {
    return team.submissions.filter((el) => el.milestone._id === milestone._id);
  };

  selectSubmission = (index) => {
    this.setState({ selectedSubmission: index });
  };

  render() {
    const { team, milestone } = this.props;
    const styles = {
      display: "flex",
      flexGrow: 3,
    };

    if (!this.props.milestone) {
      return <div style={styles}>No milestone selected!</div>;
    }

    const submissions = this.getSubmissions(team, milestone);
    if (submissions.length === 0) {
      return <div style={styles}>No submissions!</div>;
    }

    const submission = team.submissions[this.state.selectedSubmission];

    return (
      <div style={styles}>
        <div style={{ flexGrow: 2 }}>
          <div>{milestone.title}</div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            {submissions.map((_, index) => (
              <div
                key={`submission-${index}`}
                onClick={() => this.selectSubmission(index)}
              >{`Submission ${index}`}</div>
            ))}
          </div>
          <div>
            {Object.keys(submission.form_response).map((el, index) => (
              <div key={`response-item-${index}`}>
                <div>{el}</div>
                <div>{submission.form_response[el]}</div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <Feedback feedback={submission.feedback} />
      </div>
    );
  }
}

export default MilestoneDetails;
