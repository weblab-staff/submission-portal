import React from "react";

class StudentViewDetailed extends React.Component {
  render() {
    const { toggleView, milestone, submissions } = this.props;
    console.log("detailed subsmissions", submissions);
    return (
      <div>
        <h1>Milestone: {milestone.title}. </h1>
        {submissions.length !== 0 ? (
          <span>
            last submission received:
            {submissions[submissions.length - 1].timestamp}
          </span>
        ) : (
          <span>You haven't submitted anything for this milestone yet!</span>
        )}
        {submissions.map((submission, index) => (
          <div key={index}>
            <h3>
              submission: {index} received: {submission.timestamp}
            </h3>
            <p> {JSON.stringify(submission.form_response)} </p>
          </div>
        ))}
        <div>
          <a href={milestone.handin_link}>New Submission</a>
        </div>
        <button onClick={toggleView(-1)}>Back</button>
      </div>
    );
  }
}

export default StudentViewDetailed;
