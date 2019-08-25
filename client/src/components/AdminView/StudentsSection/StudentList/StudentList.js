import React from "react";
import StudentListHeader from "./StudentListHeader";
import StudentEntry from "./StudentEntry";
import StudentInfoModal from "./StudentInfoModal";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      modalInfo: null,
    };
  }

  showInfoModal = (info) => {
    this.setState({ modalActive: true, modalInfo: info });
  };

  hideInfoModal = () => {
    this.setState({ modalActive: false });
  };

  isSelected = (student) => {
    return this.props.selectedStudents.includes(student);
  };

  render() {
    let list = <div>No students!</div>;

    if (this.props.students && this.props.students.length > 0) {
      list = this.props.students.map((el, index) => (
        <StudentEntry
          key={`student-${index}`}
          student={el}
          selected={this.isSelected(el)}
          selectStudent={this.props.selectStudent}
          deselectStudent={this.props.deselectStudent}
          showInfoModal={this.showInfoModal}
          showMilestonesSection={this.props.showMilestonesSection}
        />
      ));
    }

    return (
      <div className="u-marginBottom-xxxl">
        {this.state.modalActive && (
          <StudentInfoModal info={this.state.modalInfo} hideInfoModal={this.hideInfoModal} />
        )}
        <StudentListHeader
          students={this.props.students}
          selectedStudents={this.props.selectedStudents}
          selectAll={this.props.selectAll}
          deselectAll={this.props.deselectAll}
          handleSort={this.props.handleSort}
        />
        {list}
      </div>
    );
  }
}

export default StudentList;
