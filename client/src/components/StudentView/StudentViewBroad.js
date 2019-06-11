import React from "react";

class StudentViewBroad extends React.Component {
  render() {
    const {
      toggleView
    } = this.props;
    return (
      <div>
        Milestone # submitted by <div onClick={toggleView}>Cory Lynch</div>
        Milestone # submitted by <div onClick={toggleView}>Cory Lynch</div>
        Milestone # submitted by <div onClick={toggleView}>Cory Lynch</div>
        Milestone # submitted by <div onClick={toggleView}>Cory Lynch</div>
      </div>
    )
    ;
  }
}

export default StudentViewBroad;
