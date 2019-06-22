import React from "react";
import StudentList from "./StudentList/StudentList";
import TeamList from "./TeamList/TeamList";

class StudentsBody extends React.Component {
  render() {
    const { activeList, selectedStudents, selectStudent, deselectStudent } = this.props;

    return (
      <div>
        {activeList === 'INDIVIDUAL' ? 
          <StudentList 
            selectedStudents={selectedStudents}
            selectStudent={selectStudent}
            deselectStudent={deselectStudent}
            deselectAll={this.props.deselectAll}
          /> : 
          <TeamList />
        }
      </div>
    );
  }
}

export default StudentsBody;
