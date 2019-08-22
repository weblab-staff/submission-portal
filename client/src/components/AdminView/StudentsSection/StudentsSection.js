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

  setInfo = (category, info) => {
    if (category === ListOptions.INDIVIDUAL) {
      this.setState({ students: info });
    } else {
      this.setState({ teams: info });
    }
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

  selectAll = (category) => {
    if (category === ListOptions.INDIVIDUAL) {
      this.setState({ selectedStudents: this.state.students });
    } else {
      this.setState({ selectedTeams: this.state.teams });
    }
  };

  deselectAll = (category) => {
    if (category === ListOptions.INDIVIDUAL) {
      this.setState({ selectedStudents: [] });
    } else {
      this.setState({ selectedTeams: [] });
    }
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
          milestones={this.state.milestones}
          selectedStudents={this.state.selectedStudents}
          selectedTeams={this.state.selectedTeams}
          selectStudent={this.selectStudent}
          deselectStudent={this.deselectStudent}
          selectTeam={this.selectTeam}
          deselectTeam={this.deselectTeam}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          showMilestonesSection={this.props.showMilestonesSection}
          setInfo={this.setInfo}
        />
      </div>
    );
  }
}

export default StudentsSection;
