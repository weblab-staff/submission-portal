import React from "react";
import StudentViewBroad from './StudentViewBroad';
import StudentViewDetailed from './StudentViewDetailed';

class StudentViewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  toggleView = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const {
      currentTeam
    } = this.props;
    const {
      expanded
    } = this.state;
    return (
      <div className="milestonesContainer">
        {expanded ? <StudentViewDetailed currentTeam={currentTeam} toggleView={this.toggleView}/> : <StudentViewBroad currentTeam={currentTeam} toggleView={this.toggleView}/>}
      </div>
    )
    ;
  }
}

export default StudentViewBody;
