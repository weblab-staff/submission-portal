import React from "react";

class StudentViewDetailed extends React.Component {
  render() {
    console.log(submissions);
    const { toggleView, milestone, submissions } = this.props;
    return (
      <div>
        Milestone: {milestone.title}.
        <span>
          last submission received:{" "}
          {submissions[submissions.length - 1].timestamp}
        </span>
        {submissions.map(submission, index => {
          return (
            <div key={index}>
              <h3>
                submission: {index} received: {submission.timestamp}
              </h3>
              <p> {submission.form_response} </p>
            </div>
          );
        })}
        <div>
          <a href={milestone.handin_link}>New Submission</a>
        </div>
        <button onClick={toggleView}>Back</button>
      </div>
    );
  }
}

export default StudentViewDetailed;
