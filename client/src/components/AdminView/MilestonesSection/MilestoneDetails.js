import React from "react";
import Feedback from "./Feedback";
import Switch from "../Switch";
import { post } from "../../../utils";

class MilestoneDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubmission: 0,
    };
  }

  selectSubmission = (index) => {
    this.setState({ selectedSubmission: index });
  };

  manualCredit = () => {
    post(`/api/teams/${this.props.team._id}/mark-complete`, {
      milestone_id: this.props.milestone._id,
    })
      .then((res) => {
        alert("refresh to see");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { team, milestone } = this.props;
    const styles = {
      display: "flex",
      flexGrow: 3,
    };

    if (!milestone) {
      return <div style={styles}>No milestone selected!</div>;
    }

    const submissions = team.submissions[milestone._id];
    if (!milestone.autograde) {
      return (
        <div style={{ flexGrow: 3 }}>
          <div>{milestone.title}</div>
          <div>No Auto-grade Results!</div>
          <div>
            <div>Manual credit status below</div>
            <Switch checked={submissions && submissions.length > 0} onChange={this.manualCredit} />
          </div>
        </div>
      );
    }

    if (!submissions || submissions.length === 0) {
      return <div style={styles}>No submissions!</div>;
    }

    const submission = submissions[this.state.selectedSubmission];

    return (
      <div style={styles}>
        <div style={{ flexGrow: 2 }}>
          <div>{milestone.title}</div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            {submissions.map((_, index) => (
              <div
                style={{ cursor: "pointer", marginRight: "10px" }}
                key={`submission-${index}`}
                onClick={() => this.selectSubmission(index)}
              >{`Submission ${index}`}</div>
            ))}
          </div>
          <div>
            {Object.keys(submission.form_response).map((el, index) => (
              <div key={`response-item-${index}`}>
                <div>{el}</div>
                <div>{submission.form_response[el]}</div>
                <br />
              </div>
            ))}
          </div>
        </div>
        <Feedback team={team} submission={submission} />
      </div>
    );
  }
}

export default MilestoneDetails;
