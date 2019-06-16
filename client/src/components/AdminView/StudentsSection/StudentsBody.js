import React from "react";
import StudentList from "./StudentList/StudentList";
import TeamList from "./TeamList/TeamList";

class StudentsBody extends React.Component {
  render() {
    const { activeList } = this.props;

    return (
      <div>
        {activeList === 'INDIVIDUAL' ? <StudentList /> : <TeamList />}
      </div>
    );
  }
}

export default StudentsBody;
