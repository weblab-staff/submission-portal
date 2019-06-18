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
      toggleView
    } = this.props;
    const {
      milestones,
      loading
    } = this.state;
    return (
      <div>
        {loading ? <div>LOADING!</div> : (
          milestones.map(mileObj => {
            return <div
              key={mileObj._id}
              >
              {mileObj.title} submitted by <button onClick={toggleView}>Cory Lynch</button>
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
