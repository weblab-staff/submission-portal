import React from "react";
import GradesHeader from "./GradesHeader";
import GradeableList from "./GradeableList";
import { get } from "../../../utils";
import { hasSubmission } from "../../../js/teams";

class GradesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      milestones: [],
      allTeams: [],
      selectedTeams: [],
      selectedSubmit: "submit",
      rangeMin: 1,
      rangeMax: 1
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (query = null) => {
    Promise.all([
      get("/api/milestones/"),
      get(
        "/api/teams",
        query ? { populate: true, searchQuery: query } : { populate: true }
      )
    ])
      .then(data => {
        this.setState({
          loading: false,
          milestones: data[0],
          allTeams: data[1],
          selectedTeams: data[1], //TODO how will this integrate with search?
          rangeMax: data[1].length
        });
      })
      .catch(err => console.log(err));
  };

  updateRange = event => {
    const target = event.target;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    this.setState({
      [target.name]: value
    });
  };

  updateSelectedTeams = event => {
    const { allTeams } = this.state;
    const selectedMilestoneId = event.target.value;
    let newSelectedTeams = allTeams;
    console.log("selected:" + selectedMilestoneId);
    if (selectedMilestoneId !== "") {
      newSelectedTeams = allTeams.filter(team => {
        return hasSubmission(team, selectedMilestoneId);
      });
    }

    this.setState({
      selectedTeams: newSelectedTeams,
      rangeMax: newSelectedTeams.length == 0 ? 1 : newSelectedTeams.length,
      rangeMin: 1
    });
  };

  render() {
    const {
      loading,
      milestones,
      selectedTeams,
      rangeMin,
      rangeMax
    } = this.state;

    if (loading) {
      return <div>Loading!</div>;
    }

    return (
      <div>
        <GradesHeader
          milestones={milestones}
          teams={selectedTeams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          handleChange={this.updateRange}
          changeSelectedMilestone={this.updateSelectedTeams}
          getTeams={this.loadData}
        />
        <GradeableList
          milestones={milestones}
          teams={selectedTeams}
          rangeMin={Number.isNaN(rangeMin) ? 1 : rangeMin}
          rangeMax={
            Number.isNaN(rangeMax) || rangeMax < rangeMin
              ? rangeMin + 1
              : rangeMax
          }
          showMilestonesSection={this.props.showMilestonesSection}
        />
      </div>
    );
  }
}

export default GradesSection;
