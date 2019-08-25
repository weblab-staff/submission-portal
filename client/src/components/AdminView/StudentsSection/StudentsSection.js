import React from "react";
import StudentsHeader from "./StudentsHeader/StudentsHeader";
import StudentsBody from "./StudentsBody";
import EmailModal from "./EmailModal";
import { get } from "../../../utils";
import MilestonesSection from "../MilestonesSection/MilestonesSection";

import "./StudentSection.css";

export const ListOptions = {
  INDIVIDUAL: "INDIVIDUAL",
  TEAM: "TEAM"
};

class StudentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeList: ListOptions.INDIVIDUAL,
      students: [],
      teams: [],
      milestones: [],
      filter: "",
      selectedStudents: [],
      selectedTeams: [],
      selectedTeamId: null,
      emailModalActive: false
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    Promise.all([
      get("/api/users/", { populate: true }),
      get("/api/teams/", { populate: true }),
      get("/api/milestones/")
    ])
      .then(data => {
        this.setState({
          loading: false,
          students: data[0],
          teams: data[1],
          milestones: data[2]
        });
      })
      .catch(err => console.log(err));
  };

  getStudents = async query => {
    const students = await get("/api/users/", {
      populate: true,
      searchQuery: query
    });
    this.setState({ students: students });
  };

  handleSort = sortingFn => {
    if (this.state.activeList === ListOptions.INDIVIDUAL) {
      this.setState({ students: this.state.students.sort(sortingFn) });
    } else {
      this.setState({ teams: this.state.teams.sort(sortingFn) });
    }
  };

  setActiveList = list => {
    this.setState({ activeList: list });
  };

  selectStudent = student => {
    this.setState({
      selectedStudents: [...this.state.selectedStudents, student]
    });
  };

  deselectStudent = student => {
    this.setState({
      selectedStudents: this.state.selectedStudents.filter(
        el => el._id !== student._id
      )
    });
  };

  selectTeam = team => {
    this.setState({
      selectedTeams: [...this.state.selectedTeams, team]
    });
  };

  deselectTeam = team => {
    this.setState({
      selectedTeams: this.state.selectedTeams.filter(el => el._id !== team._id)
    });
  };

  selectAll = () => {
    if (this.state.activeList === ListOptions.INDIVIDUAL) {
      this.setState({ selectedStudents: this.state.students });
    } else {
      this.setState({ selectedTeams: this.state.teams });
    }
  };

  deselectAll = () => {
    if (this.state.activeList === ListOptions.INDIVIDUAL) {
      this.setState({ selectedStudents: [] });
    } else {
      this.setState({ selectedTeams: [] });
    }
  };

  showEmailModal = () => {
    this.setState({
      emailModalActive: true
    });
  };

  hideEmailModal = () => {
    this.setState({
      emailModalActive: false
    });
  };

  setFilter = term => {
    this.setState({
      filter: term
    });
  };

  withFilter = (category, list, term) => {
    term = term.toLowerCase();

    if (category === ListOptions.INDIVIDUAL) {
      return list.filter(
        el =>
          el.first_name.toLowerCase().includes(term) ||
          el.last_name.toLowerCase().includes(term)
      );
    } else {
      return list.filter(el => el.team_name.toLowerCase().includes(term));
    }
  };
  showMilestonesSection = teamId => {
    this.setState({ selectedTeamId: teamId });
    this.props.toggleViewMilestones();
  };

  render() {
    if (this.props.showingMilestoneSection) {
      return (
        <MilestonesSection
          teamId={this.state.selectedTeamId}
          hideMilestonesSection={this.props.toggleViewMilestones}
        />
      );
    }
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
          getStudents={this.getStudents}
          setFilter={this.setFilter}
        />
        <StudentsBody
          loading={this.state.loading}
          activeList={this.state.activeList}
          students={this.withFilter(
            ListOptions.INDIVIDUAL,
            this.state.students,
            this.state.filter
          )}
          teams={this.withFilter(
            ListOptions.TEAM,
            this.state.teams,
            this.state.filter
          )}
          milestones={this.state.milestones}
          selectedStudents={this.state.selectedStudents}
          selectedTeams={this.state.selectedTeams}
          selectStudent={this.selectStudent}
          deselectStudent={this.deselectStudent}
          selectTeam={this.selectTeam}
          deselectTeam={this.deselectTeam}
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          handleSort={this.handleSort}
          showMilestonesSection={this.showMilestonesSection}
          setInfo={this.setInfo}
        />
      </div>
    );
  }
}

export default StudentsSection;
