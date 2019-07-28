import React from "react";

class MilestoneDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubmission: 0,
    };
  }

  getSubmissions = (team, milestone) => {
    return team.submissions.filter((el) => el.milestone._id === milestone._id);
  };

  render() {
    const { team, milestone } = this.props;
    const styles = {
      width: "40vw",
    };

    if (!this.props.milestone) {
      return <div style={styles}>No milestone selected!</div>;
    }

    const submissions = this.getSubmissions(team, milestone);
    if (submissions.length === 0) {
      return <div style={styles}>No submissions!</div>;
    }

    return (
      <div style={styles}>
        <div>{milestone.title}</div>
        <div style={{ display: "flex" }}>
          {submissions.map((submission, index) => (
            <div
              key={`submission-${index}`}
              onClick={() => this.props.selectSubmission(index)}
            >{`Submission ${index}`}</div>
          ))}
        </div>
        <div>submission stuff</div>
      </div>
    );
  }
}

export default MilestoneDetails;
