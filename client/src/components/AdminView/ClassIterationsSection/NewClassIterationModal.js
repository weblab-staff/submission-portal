import React from "react";

class NewClassIterationModal extends React.Component {
  confirmNewIteration = () => {
    this.props.confirmNewIteration();
  }

  cancelNewIteration = () => {
    // Clear fields
    this.props.cancelNewIteration();
  }

  render() {
    const styles = {
      border: '1px solid black',
      background: 'white',
      position: 'absolute',
      left: '40vw',
      top: '10vh',
      width: '300px',
      height: '300px',
      zIndex: '2'
    }

    return (
      <div style={styles}>
        <div>Fill this out pls</div>
        <button onClick={this.confirmNewIteration}>confirm</button>
        <button onClick={this.cancelNewIteration}>cancel</button>
      </div>
    );
  }
}

export default NewClassIterationModal;
