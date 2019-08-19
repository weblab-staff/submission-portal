import React from "react";
import StudentsHeader from "./StudentsHeader/StudentsHeader";
import StudentsBody from "./StudentsBody";
import EmailModal from "./EmailModal";
import { get } from "../../../utils";

// gets students AND teams, that's it.
// remove refresh() and all calls to it -> alex will implement socket which will fix this
// change sorting function to a <Sort> component which takes list + sorting fn
//    this component will have the Ascending / descending logic
//    make TeamList as similar structually to StudentList as you can

class StudentsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: "INDIVIDUAL", // move down, use an enum for this
      emailModalActive: false,
      selectedStudents: [],
      selectedTeams: [],
      students: null,
      loading: false,
      modalInfo: null,
      activeSort: null, // move down
      sortOrder: "NONE", // move into sort component, use enum for this
      modalActive: false
    };
  }

  componentDidMount() {
    this.getStudents();
  }

  genSortFunction(param, sortOrder) {
    // This is probably too overcomplicated but im bad
    if (sortOrder === "ASC") {
      if (param === "for_credit") {
        return (a, b) => a[param] - b[param];
      }
      if (param === "team_name") {
        return (a, b) => {
          const aTeam = a.team ? a.team.team_name : "???";
          const bTeam = b.team ? b.team.team_name : "???";
          return aTeam.localeCompare(bTeam);
        };
      }

      return (a, b) => a[param].localeCompare(b[param]);
    } else {
      if (param === "for_credit") {
        return (a, b) => b[param] - a[param];
      }
      if (param === "team_name") {
        return (a, b) => {
          const aTeam = a.team ? a.team.team_name : "???";
          const bTeam = b.team ? b.team.team_name : "???";
          return bTeam.localeCompare(aTeam);
        };
      }

      return (a, b) => b[param].localeCompare(a[param]);
    }
  }

  handleSort = param => {
    let sortOrder = "ASC";
    if (this.state.activeSort === param && this.state.sortOrder === "ASC") {
      sortOrder = "DES";
    }

    let sortedStudents = [...this.props.students];
    console.log("sorted:");
    console.log(sortedStudents);
    sortedStudents.sort(this.genSortFunction(param, sortOrder));

    this.setState({
      students: sortedStudents,
      activeSort: param,
      sortOrder
    });
  };

  showInfoModal = info => {
    this.setState({ modalActive: true, modalInfo: info });
  };

  hideInfoModal = () => {
    this.setState({ modalActive: false });
  };

  isSelected = student => {
    return this.state.selectedStudents.includes(student);
  };

  getStudents = (query = null) => {
    get(
      "/api/users/",
      query ? { populate: true, searchQuery: query } : { populate: true }
    )
      .then(data => {
        if (data) {
          let newModalInfo = null;
          if (this.state.modalInfo) {
            newModalInfo = data.filter(
              el => el._id === this.state.modalInfo._id
            )[0];
          }
          this.setState({
            loading: false,
            students: data,
            modalInfo: newModalInfo
          });
        } else {
          this.setState({
            loading: false,
            students: null
          });
        }
      })
      .catch(err => console.log(err));
  };

  setActiveList = list => {
    this.setState({ activeList: list });
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

  selectStudent = student => {
    this.setState({
      selectedStudents: [...this.state.selectedStudents, student]
    });
  };

  selectTeam = team => {
    this.setState({
      selectedTeams: [...this.state.selectedTeams, team]
    });
  };

  deselectStudent = student => {
    this.setState({
      selectedStudents: this.state.selectedStudents.filter(
        el => el._id !== student._id
      )
    });
  };

  deselectTeam = team => {
    this.setState({
      selectedTeams: this.state.selectedTeams.filter(el => el._id !== team._id)
    });
  };

  deselectAll = () => {
    this.setState({
      selectedStudents: []
    });
  };

  selectAll = students => {
    this.setState({
      selectedStudents: students
    });
  };

  render() {
    const {
      activeList,
      emailModalActive,
      selectedStudents,
      selectedTeams,
      students,
      loading,
      modalInfo,
      activeSort,
      sortOrder,
      modalActive
    } = this.state;
    return (
      <div>
        {emailModalActive && (
          <EmailModal
            selectedStudents={selectedStudents}
            hideEmailModal={this.hideEmailModal}
            deselectAll={this.deselectAll}
          />
        )}
        <StudentsHeader
          showEmailModal={this.showEmailModal}
          setActiveList={this.setActiveList}
          selectedStudents={selectedStudents}
          selectedTeams={selectedTeams}
          students={students}
          getStudents={this.getStudents}
          deselectStudent={this.deselectStudent}
        />
        <StudentsBody
          activeList={activeList}
          selectedStudents={selectedStudents}
          getStudents={this.getStudents}
          selectStudent={this.selectStudent}
          selectAll={this.selectAll}
          students={students}
          loading={loading}
          modalInfo={modalInfo}
          activeSort={activeSort}
          sortOrder={sortOrder}
          modalActive={modalActive}
          deselectStudent={this.deselectStudent}
          deselectAll={this.deselectAll}
          showMilestonesSection={this.props.showMilestonesSection}
          hideInfoModal={this.hideInfoModal}
          showInfoModal={this.showInfoModal}
          handleSort={this.handleSort}
          isSelected={this.isSelected}
        />
      </div>
    );
  }
}

export default StudentsSection;
