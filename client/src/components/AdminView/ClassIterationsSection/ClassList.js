import React from "react";
import ClassEntry from "./ClassEntry";
import { get, post } from "../../../utils";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      years: [{year: 2019, active: true}, {year: 2018, active: false}],
    }
  }

  toggleActiveYear = (year) => {
    // post('/class/active-year', {new_year: year})
    //   .then(data => {
    //     this.setState({
    //       years: data.years,
    //     })
    //   })
    //   .catch(err => console.log(err));
    console.log(`Toggling active state for ${year} year!`)
  }

  makeNewIteration = () => {
    if (confirm('Are you sure you want to make a new class iteration?')) {
      console.log('Making a new class iteration');
    } else {
      console.log('NOT making a new class iteration');
    }
  }

  componentDidMount() {
    // get('/class/years')
    //   .then(data => {
    //     this.setState({
    //       loading: false,
    //       years: data.years,
    //     });
    //   })
    //   .catch(err => console.log(err));
    console.log('Getting ClassList data');
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>Year</div>
          <div>Active</div>
          <button onClick={this.makeNewIteration}>New Iteration</button>
        </div>
        <hr />
        {this.renderMainContent()}
      </div>
    );
  }

  renderMainContent() {
    const { loading, years } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      );
    }
    
    return (
      <div>
        {years.map((el, index) => 
          <ClassEntry key={index} year={el.year} 
            active={el.active} toggleActiveYear={this.toggleActiveYear}
            setViewedYear={this.props.setViewedYear} />
        )}
      </div>
    );
  }
}

export default ClassList;
