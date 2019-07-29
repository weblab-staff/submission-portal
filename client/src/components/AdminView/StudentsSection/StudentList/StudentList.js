import React from "react";
import StudentListHeader from "./StudentListHeader";
import StudentEntry from "./StudentEntry";
import StudentInfoModal from "./StudentInfoModal";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    if (this.props.loading) {
      return <div>Loading!</div>;
    }
    console.log(this.props.students)
    let list = <div>No students!</div>;

    if (this.props.students && this.props.students.length > 0) {
      list = this.props.students.map((el, index) => (
        <StudentEntry
          key={index}
          info={el}
          selected={() => this.props.isSelected(el)}
          selectStudent={this.props.selectStudent}
          deselectStudent={this.props.deselectStudent}
          showInfoModal={this.props.showInfoModal}
          refresh={this.props.getStudents}
        />
      ));
    }

    return (
      <div>
        {this.props.modalActive && (
          <StudentInfoModal
            info={this.props.modalInfo}
            hideInfoModal={this.props.hideInfoModal}
            refresh={this.props.getStudents}
          />
        )}
        <StudentListHeader
          activeSort={this.props.activeSort}
          sortOrder={this.props.sortOrder}
          handleSort={this.props.handleSort}
          selectedStudents={this.props.selectedStudents}
          selectAll={() => this.props.selectAll(students)}
          deselectAll={this.props.deselectAll}
        />
        {list}
      </div>
    );
  }
}

export default StudentList;
