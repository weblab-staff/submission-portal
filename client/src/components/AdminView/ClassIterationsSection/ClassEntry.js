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
      <div className="classIteration-entry u-marginBottom-md">
        <div>{`${year} Class`}</div>
        {active ? (
          <span>active</span>
        ) : (
          <button className="classIteration-button u-pointer" onClick={this.makeYearActive}>
            make active
          </button>
        )}
        <div
          className="u-textAlignRight classIteration-viewText u-pointer"
          onClick={this.setViewedYear}
        >
          View
        </div>
      </div>
    );
  }
}

export default ClassEntry;
