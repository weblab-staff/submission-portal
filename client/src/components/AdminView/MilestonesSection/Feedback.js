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
    post(`api/teams/${this.props.team._id}/feedback`, {
      milestone_submission_id: this.props.submission._id,
      feedback: this.state.feedback,
    })
      .then((res) => console.log("Success!"))
      .catch((err) => console.log(err));
  };

  render() {
    const { submission } = this.props;

    return (
      <div style={{ flexGrow: 1 }}>
        <div>Feedback</div>
        {submission.feedback &&
          submission.feedback.map((el, index) => (
            <div
              key={`feedback-${index}`}
              style={{ margin: "10px 0", border: "1px solid black" }}
            >
              <div>{el.from}</div>
              <br />
              <div>{el.body}</div>
            </div>
          ))}
        <input onChange={this.handleChange} />
        <button onClick={this.sendFeedback}>send</button>
      </div>
    );
  }
}

export default Feedback;
