import React from "react";
import ClassList from "./ClassList";

class ClassIterationsSection extends React.Component {
  render() {
    return (
      <div>
        <h1 className="tabHeader">Class Iterations</h1>
        <ClassList />
      </div>
    );
  }
}

export default ClassIterationsSection;
