import React from "react";
import { get } from "../../utils";

class MilestoneSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
    };
  }

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones = () => {
    get(`/api/milestones`)
      .then((mileObjs) => {
        this.setState({
          milestones: mileObjs,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { milestones } = this.state;
    return (
      <div>
        MilestoneSection!
        {milestones.map((mileObj) => {
          return (
            <div key={mileObj._id}>
              {mileObj.title}
              <div>due: {mileObj.deadline}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MilestoneSection;
