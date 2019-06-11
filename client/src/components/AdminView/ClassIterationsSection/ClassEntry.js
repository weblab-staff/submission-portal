import React from "react";

class ClassEntry extends React.Component {
  render() {
    const { year } = this.props;

    return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>{`${year} Class`}</div>
        <input type='checkbox' />
        <div style={{ color: 'blue', cursor: 'pointer' }}>Open</div>
      </div>
    );
  }
}

export default ClassEntry;
