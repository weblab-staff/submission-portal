import React from "react";

class Feedback extends React.Component {
  render() {
    const { feedback } = this.props;

    return (
      <div style={{ flexGrow: 1 }}>
        <div>Feedback</div>
        {feedback && feedback.map((el, index) => <div>Feedback {index}</div>)}
        <input />
        <button>send</button>
      </div>
    );
  }
}

export default Feedback;
