import React from "react";
import ClassIterationHeader from './ClassIterationHeader';
import ClassList from "./ClassList";

class ClassIterationsSection extends React.Component {
  render() {
    return (
      <div>
        <ClassIterationHeader />
        <ClassList setViewedYear={this.props.setViewedYear} />
      </div>
    );
  }
}

export default ClassIterationsSection;
