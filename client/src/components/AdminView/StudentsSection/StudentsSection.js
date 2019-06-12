import React from "react";
import StudentsHeader from "./StudentsHeader/StudentsHeader";
import StudentsBody from "./StudentsBody";

class StudentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: 'INDIVIDUAL',
    };
  }

  setActiveList = (list) => {
    this.setState({ activeList: list });
  }

  render() {
    const { activeList } = this.state;

    return (
      <div>
        <StudentsHeader setActiveList={this.setActiveList} />
        <StudentsBody activeList={activeList} />
      </div>
    );
  }
}

export default StudentsSection;
