import React from "react";
import { get } from "../../utils";

class StudentViewBroad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones = () => {
    get(`/api/milestones`)
      .then(mileObjs => {
        this.setState({
          milestones: mileObjs,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { toggleView, currentTeam } = this.props;
    const { milestones, loading } = this.state;
    return (
      <React.Fragment>
        {loading
          ? [0, 1, 2, 3].map(() => {
              return (
                <div className="milestone-Container">
                  <div className="skeleton milestone-Indicator" />
                  <div className="milestone-Info">
                    <div className="skeleton skeleton-line--short milestone-Name" />
                    <div className="skeleton skeleton-line--long milestone-Due" />
                  </div>
                </div>
              );
            })
          : milestones.map(mileObj => {
              // TODO: the below should check for existence of current team before obtaining submissions.
              const sub = currentTeam.submissions
                .slice()
                .reverse()
                .find(sub => sub.milestone === mileObj._id);
              return (
                <div
                  key={mileObj._id}
                  className="milestone-Container"
                  onClick={toggleView}
                >
                  <div className="milestone-Indicator" />
                  <div className="milestone-Info">
                    <div className="milestone-Name">{mileObj.title}</div>
                    <button onClick={toggleView}>
                      {sub
                        ? "last submitted " + sub.timestamp
                        : "no submissions!"}
                    </button>
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
