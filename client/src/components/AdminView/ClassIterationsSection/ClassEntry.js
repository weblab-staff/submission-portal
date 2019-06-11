import React from "react";

class ClassEntry extends React.Component {
  toggleActiveYear = () => {
    this.props.toggleActiveYear(this.props.year);
  }

  setViewedYear = () => {
    this.props.setViewedYear(this.props.year);
  }

  render() {
    const { year, active, onClick } = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>{`${year} Class`}</div>
        <input type='checkbox' checked={active} onChange={this.toggleActiveYear}/>
        <div style={{ color: 'blue', cursor: 'pointer' }} onClick={this.setViewedYear}>View</div>
      </div>
    );
  }
}

export default ClassEntry;
