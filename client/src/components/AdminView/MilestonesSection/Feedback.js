import React from "react";
import { post } from "../../../utils";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      feedback: value,
    });
  };

  sendFeedback = () => {
    // post(`/teams/${}/feedback`, {
    //   from: "test",
    //   milestone_submission_id: "???",
    //   feedback:this.state.feedback
    // })
    // .then(res => console.log(res)).catch(err=> console.log(err));
    console.log("sending feedback");
  };

  render() {
    const { feedback } = this.props;

    return (
      <div style={{ flexGrow: 1 }}>
        <div>Feedback</div>
        {feedback && feedback.map((el, index) => <div>Feedback {index}</div>)}
        <input onChange={this.handleChange} />
        <button onClick={this.sendFeedback}>send</button>
      </div>
    );
  }
}

export default Feedback;
