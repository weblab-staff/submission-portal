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
      rangeMin: 1,
      rangeMax: 1,
    }
  }

  componentDidMount() {
    this.getStuff();
  }

  getStuff = () => {
    Promise.all([
      get('/api/milestones/'),
      get('/api/teams', {populate: true})
    ])
    .then(data => {
      this.setState({
        loading: false,
        milestones: data[0],
        teams: data[1],
        rangeMax: data[1].length
      });
    })
    .catch(err => console.log(err));
  }

  changeMin = (event) => {
    const target = event.target;
    const value = parseInt(target.value);

    this.setState({
      rangeMin: value,
    })
  }

  changeMax = (event) => {
    const target = event.target;
    const value = parseInt(target.value);

    this.setState({
      rangeMax: value,
    })
  }

  render() {
    const { loading, milestones, teams, rangeMin, rangeMax } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }

    return (
      <div>
        <GradesHeader 
          milestones={milestones}
          teams={teams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
          changeMin={this.changeMin}
          changeMax={this.changeMax}
        />
        <GradeableList
          milestones={milestones}
          teams={teams}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
        />
      </div>
    );
  }
}

export default GradesSection;
