import React from "react";
import StudentList from "./StudentList/StudentList";
import TeamList from "./TeamList/TeamList";

class StudentsBody extends React.Component {
  render() {
    const { activeList, selectedStudents, selectStudent, selectAll, deselectStudent, deselectAll } = this.props;

    return (
      <div>
        {activeList === 'INDIVIDUAL' ? 
          <StudentList 
            selectedStudents={selectedStudents}
            selectStudent={selectStudent}
            selectAll={selectAll}
            deselectStudent={deselectStudent}
            deselectAll={deselectAll}
          /> : 
          <TeamList />
        }
      </div>
    );
  }
}

export default StudentsBody;
