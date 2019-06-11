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
      expanded
    } = this.state;
    return (
      <div>
        StudentViewBody!
        {expanded ? <StudentViewDetailed toggleView={this.toggleView}/> : <StudentViewBroad toggleView={this.toggleView}/>}
      </div>
    )
    ;
  }
}

export default StudentViewBody;
