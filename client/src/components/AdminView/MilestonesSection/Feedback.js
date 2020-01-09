import React from "react";
import { post } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
    };
  }

  sendFeedback = () => {
    post(`api/teams/${this.props.team._id}/feedback`, {
      milestone_submission_id: this.props.submission._id,
      feedback: this.state.feedback,
    })
      .then((res) => {
        window.open(res.mailto, "_blank");
        this.props.refresh();
        this.setState({ feedback: "" });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ feedback: value });
  };

  render() {
    const { submission } = this.props;

    return (
      <div>
        <div className="feedback-container">
          <div className="feedback-specificContainer feedback-title">Feedback</div>
          {submission.feedback &&
            submission.feedback.map((el, index) => (
              <div className="feedback-specificContainer" key={`feedback-${index}`}>
                <div className=" feedback-specificFrom">{el.from}</div>
                <div className=" feedback-specificBody">{el.body}</div>
              </div>
            ))}
          <div className="feedback-specificContainer feedback-inputContainer u-positionRelative">
            <textarea
              className="feedback-input"
              placeholder="Enter feedback..."
              value={this.state.feedback}
              onChange={this.handleChange}
            ></textarea>
            <div
              className="feedback-submit u-pointer u-flex u-flexCenter"
              onClick={this.sendFeedback}
            >
              <FontAwesomeIcon icon={["fas", "paper-plane"]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;
