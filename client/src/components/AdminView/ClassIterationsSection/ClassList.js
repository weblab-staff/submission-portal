import React from "react";
import ClassEntry from "./ClassEntry";
import NewClassIterationModal from "./NewClassIterationModal";
import { get, post } from "../../../utils";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      years: [{year: 2019, active: true}, {year: 2018, active: false}],
      modalActive: false,
    }
  }

  makeYearActive = (year) => {
    // post('/class/active-year', {new_year: year})
    //   .then(data => {
    //     this.setState({
    //       years: data.years,
    //     })
    //   })
    //   .catch(err => console.log(err));
    console.log(`Making ${year} the active year!`);
  }

  openNewIterationModal = () => {
    this.setState({ modalActive: true });
  }

  confirmNewIteration = () => {
    console.log('Making new iteration!');
    this.setState({ modalActive: false });
  }

  cancelNewIteration = () => {
    this.setState({ modalActive: false });
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
    const modalStyle = {
      display: 'none'
    }
    if (this.state.modalActive) {
      modalStyle.display = 'block'
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>Year</div>
          <div>Active</div>
          <button onClick={this.openNewIterationModal}>New Iteration</button>
        </div>
        <div style={modalStyle}>
          <NewClassIterationModal 
            confirmNewIteration={this.confirmNewIteration} 
            cancelNewIteration={this.cancelNewIteration} 
          />
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
            active={el.active} makeYearActive={this.makeYearActive}
            setViewedYear={this.props.setViewedYear} />
        )}
      </div>
    );
  }
}

export default ClassList;
