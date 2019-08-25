import React from "react";
import GradesHeader from "./GradesHeader";
import GradeableList from "./GradeableList";
import { get } from "../../../utils";
import { hasSubmission } from "../../../js/teams";
import MilestonesSection from "../MilestonesSection/MilestonesSection";

class GradesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      milestones: [],
      allTeams: [],
      selectedSubmit: "submit",
      selectedMilestoneId: "",
      selectedTeamId: null,
      rangeMin: 1,
      rangeMax: 1,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (query = null) => {
    Promise.all([
      get("/api/milestones/"),
      get("/api/teams", query ? { populate: true, searchQuery: query } : { populate: true }),
    ])
      .then((data) => {
        this.setState({
          loading: false,
          milestones: data[0],
          allTeams: data[1],
          selectedTeams: data[1],
          rangeMax: data[1].length,
        });
      })
      .catch((err) => console.log(err));
  };

  updateSelectedState = (event) => {
    const oldState = this.state;
    const target = event.target;
    const value = target.type === "number" ? parseInt(target.value) : target.value;
    this.setState({
      [target.name]: value,
    });
  };

  getSelectedTeams = () => {
    const { allTeams, selectedSubmit, selectedMilestoneId } = this.state;
    let newSelectedTeams = [];
    allTeams.forEach((team) => {
      const didSubmit = selectedMilestoneId == "" || hasSubmission(team, selectedMilestoneId);
      const showSubmitted = selectedSubmit == "submit" ? true : false;
      if (didSubmit == showSubmitted) {
        newSelectedTeams.push(team);
      }
    });
    return newSelectedTeams;
  };

  showMilestonesSection = (teamId) => {
    this.setState({ selectedTeamId: teamId });
    this.props.toggleViewMilestones();
  };

  render() {
    const { loading, milestones, rangeMin, rangeMax } = this.state;

    if (loading) {
      return <div>Loading!</div>;
    }

    if (this.props.showingMilestoneSection) {
      return (
        <MilestonesSection
          teamId={this.state.selectedTeamId}
          hideMilestonesSection={this.props.toggleViewMilestones}
        />
      );
    }

    const selectedTeams = this.getSelectedTeams();

    return (
      <div>
        <GradesHeader
          milestones={milestones}
          teams={selectedTeams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          handleChange={this.updateSelectedState}
          getTeams={this.loadData}
        />
        <GradeableList
          milestones={milestones}
          teams={selectedTeams}
          rangeMin={Number.isNaN(rangeMin) ? 1 : rangeMin}
          rangeMax={
            Number.isNaN(rangeMax) || rangeMax < rangeMin
              ? selectedTeams.length
              : rangeMax > selectedTeams.length
              ? selectedTeams.length
              : rangeMax
          }
          showMilestonesSection={this.showMilestonesSection}
        />
      </div>
    );
  }
}

export default GradesSection;
