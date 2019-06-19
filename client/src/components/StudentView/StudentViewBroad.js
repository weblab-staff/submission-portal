import React from "react";
import { get } from "../../utils";

class StudentViewBroad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      loading: true
    }
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
  }

  render() {
    const {
      toggleView,
      currentTeam
    } = this.props;
    const {
      milestones,
      loading
    } = this.state;
    return (
      <div>
        {loading ? <div>LOADING!</div> : (
          milestones.map(mileObj => {
            // this line breaks cause currentTeam props is still null
            // const sub = currentTeam.submissions.slice().reverse().find(sub => sub.milestone === mileObj._id);
            return <div
              key={mileObj._id}
              >
              <div>{mileObj.title}</div>
              <button onClick={toggleView}>{sub ? "last submitted " + sub.timestamp : "no submissions!"}</button>
              <div>due: {mileObj.deadline}</div>
            </div>
          })
        )}
      </div>
    )
    ;
  }
}

export default StudentViewBroad;
