import React from "react";
import ClassEntry from "./ClassEntry";
import NewClassIterationModal from "./NewClassIterationModal";
import { get, post } from "../../../utils";

import "./ClassIteration.css";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      years: null,
      modalActive: false,
    };
  }

  componentDidMount() {
    this.getYears();
  }

  getYears = () => {
    get("/api/class", { complete: true })
      .then((data) => {
        data.sort((a, b) => b.year - a.year); // possible error point xd
        this.setState({
          loading: false,
          years: data,
        });
      })
      .catch((err) => console.log(err));
  };

  makeYearActive = (id) => {
    post(`/api/class/${id}/set-active-year`)
      .then((status) => {
        if (status === 204) {
          this.getYears();
        }
        return "You fuked up.";
      })
      .catch((err) => console.log(err));
  };

  openNewIterationModal = () => {
    this.setState({ modalActive: true });
  };

  confirmNewIteration = (body) => {
    console.log("Making new iteration!");
    post("/api/class", body)
      .then((status) => {
        if (status === 204) {
          this.getYears();
        }
        return "You fucked up";
      })
      .catch((err) => console.log(err));
    this.setState({ modalActive: false });
  };

  cancelNewIteration = () => {
    this.setState({ modalActive: false });
  };

  getActiveYearData = () => {
    const { years } = this.state;

    if (years && years.length > 0) {
      for (let year of years) {
        if (year.is_active) {
          return year;
        }
      }
    }
  };

  render() {
    const { loading, years, modalActive } = this.state;

    if (loading) {
      return <div>Loading!</div>;
    }

    if (years && years.length === 0) {
      return <div>No years!</div>;
    }

    return (
      <div>
        <div className="bottomShadow classIteration-container classIteration-header">
          <div className="classIteration-headerContent">
            <div>Year</div>
            <div>Active</div>
            <div className="u-flex u-flexJustifyEnd">
              <button
                className="classIteration-button u-pointer"
                onClick={this.openNewIterationModal}
              >
                New Iteration
              </button>
            </div>
          </div>
        </div>
        {modalActive && (
          <NewClassIterationModal
            activeYearData={this.getActiveYearData()}
            confirmNewIteration={this.confirmNewIteration}
            cancelNewIteration={this.cancelNewIteration}
          />
        )}
        <div className="classIteration-container">
          {years.map((el, index) => (
            <ClassEntry
              key={index}
              id={el._id}
              year={el.year}
              active={el.is_active}
              makeYearActive={this.makeYearActive}
              setViewedYear={this.props.setViewedYear}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ClassList;
