import React from "react";
import StudentsHeader from "./StudentsHeader/StudentsHeader";
import StudentsBody from "./StudentsBody";
import EmailModal from "./EmailModal";
import { get } from "../../../utils";

export const ListOptions = {
  INDIVIDUAL: "INDIVIDUAL",
  TEAM: "TEAM",
};

// change sorting function to a <Sort> component which takes list + sorting fn
//    this component will have the Ascending / descending logic
//    make TeamList as similar structually to StudentList as you can

class StudentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeList: ListOptions.INDIVIDUAL,
      students: [],
      teams: [],
      milestones: [],
      selectedStudents: [],
      selectedTeams: [],
      emailModalActive: false,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    Promise.all([
      get("/api/users/", { populate: true }),
      get("/api/teams/", { populate: true }),
      get("/api/milestones/"),
    ])
      .then((data) => {
        this.setState({
          loading: false,
          students: data[0],
          teams: data[1],
          milestones: data[2],
        });
      })
      .catch((err) => console.log(err));
  };

  afterSort = (items) => {
    this.setState({ students: items });
  };

  setActiveList = (list) => {
    this.setState({ activeList: list });
  };

  selectStudent = (student) => {
    this.setState({
      selectedStudents: [...this.state.selectedStudents, student],
    });
  };

  deselectStudent = (student) => {
    this.setState({
      selectedStudents: this.state.selectedStudents.filter(
        (el) => el._id !== student._id
      ),
    });
  };

  selectTeam = (team) => {
    this.setState({
      selectedTeams: [...this.state.selectedTeams, team],
    });
  };

  deselectTeam = (team) => {
    this.setState({
      selectedTeams: this.state.selectedTeams.filter(
        (el) => el._id !== team._id
      ),
    });
  };

  selectAll = () => {
    this.setState({
      selectedStudents: this.state.students,
    });
  };

  deselectAll = () => {
    this.setState({
      selectedStudents: [],
    });
  };

  showEmailModal = () => {
    this.setState({
      emailModalActive: true,
    });
  };

  hideEmailModal = () => {
    this.setState({
      emailModalActive: false,
    });
  };

  render() {
    return (
      <div>
        {this.state.emailModalActive && (
          <EmailModal
            selectedStudents={this.state.selectedStudents}
            hideEmailModal={this.hideEmailModal}
            deselectAll={this.deselectAll}
          />
        )}
        <StudentsHeader
          showEmailModal={this.showEmailModal}
          activeList={this.state.activeList}
          setActiveList={this.setActiveList}
          selectedStudents={this.state.selectedStudents}
          selectedTeams={this.state.selectedTeams}
          deselectStudent={this.deselectStudent}
          deselectTeam={this.deselectTeam}
        />
        <StudentsBody
          loading={this.state.loading}
          activeList={this.state.activeList}
          students={this.state.students}
          teams={this.state.teams}
          selectedStudents={this.state.selectedStudents}
          selectedTeams={this.state.selectedTeams}
          selectStudent={this.selectStudent}
          deselectStudent={this.deselectStudent}
          selectTeam={this.selectTeam}
          deselectTeam={this.deselectTeam}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          showMilestonesSection={this.props.showMilestonesSection}
          afterSort={this.afterSort}
        />
      </div>
    );
  }
}

export default StudentsSection;
