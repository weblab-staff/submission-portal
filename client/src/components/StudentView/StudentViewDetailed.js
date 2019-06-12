import React from "react";

class StudentViewDetailed extends React.Component {
  render() {
    const {
      toggleView
    } = this.props;
    return (
      <div>
        Milestone # submitted by Cory Lynch
        <div>Submission 1 <button>View</button></div>
        <div>Submission 2 <button>View</button></div>
        <div>New Submission</div>
        <button onClick={toggleView}>Back</button>
      </div>
    )
    ;
  }
}

export default StudentViewDetailed;
