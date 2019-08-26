import React from "react";
import { hasSubmission } from "../../js/teams";

class StudentViewBroad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { toggleView, currentTeam, milestones } = this.props;
    return (
      <React.Fragment>
        {milestones.map((mileObj) => {
          return (
            <div key={mileObj._id} className="milestone-Container" onClick={toggleView}>
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
                    {hasSubmission(currentTeam, mileObj._id)
                      ? "last submitted " +
                        currentTeam.submissions[mileObj._id].reverse()[0].timestamp
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
