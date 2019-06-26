import React from "react";

class GradeableEntry extends React.Component {
  showMilestonesSection = () => {
    console.log('opening milestone modal');
  }

  submittedMilestone = (team, milestone) => {
    return team.submissions.some(el => el.milestone._id === milestone._id);
  }

  render() {
    const { num, team, milestones } = this.props;

    const teamBlock = {
      border: '1px solid black',
      boxShadow: '2px 1px 1px',
      margin: '20px 20px',
      width: '250px',
      padding: '20px'
    }

    const iconStyle = {
      margin: '0 10px',
      cursor: 'pointer',
    }

    return (
      <div style={teamBlock}>
        <span>{team.team_name} #{num}</span>
        <div>
          {milestones.map((ms, index) => 
            <div key={`${team.team_name}-ms-${index}`}>
              <span>{ms.title}</span>
              <span style={iconStyle} onClick={this.showMilestonesSection}>I</span>
              <span style={{margin: '0 10px'}}>{this.submittedMilestone(team, ms) ? 'Y' : 'N'}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GradeableEntry;
