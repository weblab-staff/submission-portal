import React from "react";
import StudentsHeader from "./StudentsHeader/StudentsHeader";
import StudentsBody from "./StudentsBody";
import EmailModal from "./EmailModal";

class StudentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: 'INDIVIDUAL',
      emailModalActive: false,
      selectedStudents: [],
    };
  }

  setActiveList = (list) => {
    this.setState({ activeList: list });
  }

  showEmailModal = () => {
    this.setState({
      emailModalActive: true,
    });
  }

  hideEmailModal = () => {
    this.setState({
      emailModalActive: false,
    })
  }

  selectStudent = (student) => {    
    this.setState({
      selectedStudents: [...this.state.selectedStudents, student]
    });
  }

  deselectStudent = (student) => {
    const current = [...this.state.selectedStudents]
    const newSelected = current.filter(el => el._id !== student._id);

    this.setState({
      selectedStudents: newSelected
    });
  }

  deselectAll = () => {
    this.setState({
      selectedStudents: [],
    })
  }

  render() {
    const { activeList, emailModalActive, selectedStudents } = this.state;

    return (
      <div>
        {emailModalActive &&
          <EmailModal 
            selectedStudents={selectedStudents}
            hideEmailModal={this.hideEmailModal}
          />
        }
        <StudentsHeader 
          showEmailModal={this.showEmailModal}
          setActiveList={this.setActiveList} 
          selectedStudents={selectedStudents}
          deselectStudent={this.deselectStudent}
        />
        <StudentsBody 
          activeList={activeList} 
          selectedStudents={selectedStudents}
          selectStudent={this.selectStudent}
          deselectStudent={this.deselectStudent}
          deselectAll = {this.deselectAll}
        />
      </div>
    );
  }
}

export default StudentsSection;
