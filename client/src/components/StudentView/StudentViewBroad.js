import React from "react";

class StudentViewBroad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleView, currentTeam, milestones } = this.props;
    const latestSubmissions = new Map();
    if (currentTeam) {
      currentTeam.submissions.forEach(submission => {
        latestSubmissions.set(submission.milestone._id, submission);
      });
    }
    console.log("latest submission map", latestSubmissions);
    return (
      <React.Fragment>
        {milestones.map(mileObj => {
          return (
            <div
              key={mileObj._id}
              className="milestone-Container"
              onClick={toggleView}
            >
              <div className="milestone-Indicator" />
              <div className="milestone-Info">
                <div className="milestone-Name">
                  {mileObj.submission_closed ? (
                    mileObj.title
                  ) : (
                    <a href={mileObj.handin_link}>{mileObj.title}</a>
                  )}
                </div>
                {!currentTeam ? (
                  <span>Become part of a team to see your submissions!</span>
                ) : (
                  <button onClick={toggleView(mileObj._id)}>
                    {latestSubmissions.get(mileObj._id)
                      ? "last submitted " +
                        latestSubmissions.get(mileObj._id).timestamp
                      : "no submissions!"}
                  </button>
                )}

                <div className="milestone-Due">due {mileObj.deadline}</div>
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default StudentViewBroad;
