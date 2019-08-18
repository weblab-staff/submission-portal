import React from "react";
import GradesHeader from "./GradesHeader";
import GradeableList from "./GradeableList";
import { get } from "../../../utils";

class GradesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      milestones: [],
      teams: [],
      selectedSubmit: "submit",
      selectedMilestone: "",
      rangeMin: 1,
      rangeMax: 1,
    };
  }

  componentDidMount() {
    this.getStuff();
  }

  getStuff = (query=null) => {
    Promise.all([
      get("/api/milestones/"),
      get("/api/teams", query ? { populate: true, searchQuery: query} : { populate: true }),
    ])
      .then((data) => {
        this.setState({
          loading: false,
          milestones: data[0],
          teams: data[1],
          rangeMax: data[1].length,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const target = event.target;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;

    this.setState({
      [target.name]: value,
    });
  };

  render() {
    const { loading, milestones, teams, rangeMin, rangeMax } = this.state;

    if (loading) {
      return <div>Loading!</div>;
    }

    return (
      <div>
        <GradesHeader
          milestones={milestones}
          teams={teams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          handleChange={this.handleChange}
          changeMin={this.changeMin}
          changeMax={this.changeMax}
          getTeams={this.getStuff}
        />
        <GradeableList
          milestones={milestones}
          teams={teams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          showMilestonesSection={this.props.showMilestonesSection}
        />
      </div>
    );
  }
}

export default GradesSection;
