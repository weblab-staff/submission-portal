import React from "react";
import StudentList from "./StudentList/StudentList";
import TeamList from "./TeamList/TeamList";

class StudentsBody extends React.Component {
  render() {
    const {
      activeList,
      selectedStudents,
      selectStudent,
      selectAll,
      students,
      loading,
      modalInfo,
      activeSort,
      sortOrder,
      modalActive,
      getStudents,
      deselectStudent,
      deselectAll,
      showInfoModal,
      hideInfoModal,
      handleSort,
      isSelected
    } = this.props;
    console.log(students);
    return (
      <div>
        {activeList === "INDIVIDUAL" ? (
          <StudentList
            selectedStudents={selectedStudents}
            selectStudent={selectStudent}
            selectAll={selectAll}
            students={students}
            loading={loading}
            activeSort={activeSort}
            sortOrder={sortOrder}
            modalActive={modalActive}
            getStudents={getStudents}
            deselectStudent={deselectStudent}
            deselectAll={deselectAll}
            showMilestonesSection={this.props.showMilestonesSection}
            showInfoModal={showInfoModal}
            hideInfoModal={hideInfoModal}
            handleSort={handleSort}
            isSelected={isSelected}
          />
        ) : (
          <TeamList showMilestonesSection={this.props.showMilestonesSection} />
        )}
      </div>
    );
  }
}

export default StudentsBody;
