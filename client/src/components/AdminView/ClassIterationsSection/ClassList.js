import React from "react";
import ClassEntry from "./ClassEntry";
import NewClassIterationModal from "./NewClassIterationModal";
import { get, post } from "../../../utils";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      years: null,
      modalActive: false,
    }
  }

  makeYearActive = (id) => {
    post(`/api/class/${id}/active-year`)
      .then(status => {
        if (status === 204) {
          this.getYears();
        }
        return 'You fuked up.'
      })
      .catch(err => console.log(err));
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
    this.getYears();
  }

  getYears = () => {
    get('/api/class', {complete: true})
      .then(data => {
        this.setState({
          loading: false,
          years: data,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { loading, years, modalActive } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      );
    }

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>Year</div>
          <div>Active</div>
          <button onClick={this.openNewIterationModal}>New Iteration</button>
        </div>
        {modalActive &&
          <NewClassIterationModal 
            confirmNewIteration={this.confirmNewIteration} 
            cancelNewIteration={this.cancelNewIteration} 
          />
        }
        <hr />
        {years.map((el, index) => 
          <ClassEntry key={index} id={el._id} year={el.year} 
            active={el.is_active} makeYearActive={this.makeYearActive}
            setViewedYear={this.props.setViewedYear} />
        )}
      </div>
    );
  }
}

export default ClassList;
