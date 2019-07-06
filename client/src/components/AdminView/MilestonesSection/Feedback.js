import React from "react";

class Feedback extends React.Component {
  render() {
    const { team, selectedSubmission } = this.props;

    return (
      <div>
        <div>Feedback</div>
        {team.submissions[selectedSubmission].feedback.map(
          (feedback, index) => (
            <div>Feedback {index}</div>
          )
        )}
      </div>
    );
  }
}

export default Feedback;
