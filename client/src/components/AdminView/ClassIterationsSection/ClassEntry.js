import React from "react";

class ClassEntry extends React.Component {
  makeYearActive = () => {
    this.props.makeYearActive(this.props.id);
  };

  setViewedYear = () => {
    this.props.setViewedYear(this.props.year);
  };

  render() {
    const { year, active, onClick } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>{`${year} Class`}</div>
        {active ? (
          <span>ACTIVE!</span>
        ) : (
          <button onClick={this.makeYearActive}>make active</button>
        )}
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={this.setViewedYear}
        >
          View
        </div>
      </div>
    );
  }
}

export default ClassEntry;
