import React from "react";

class NewClassIterationModal extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.activeYearData) {
      const { activeYearData } = this.props;
      this.state = {
        year: activeYearData.year,
        team_size_cap: activeYearData.team_size_cap,
        admins: activeYearData.admins,
      };
    } else {
      // probably fuked if we here.
      this.state = {
        year: null,
        team_size_cap: null,
        admins: null,
      };
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "number" ? parseInt(target.value) : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  confirmNewIteration = () => {
    this.props.confirmNewIteration(this.state);
  };

  cancelNewIteration = () => {
    this.props.cancelNewIteration();
  };

  render() {
    const styles = {
      border: "1px solid black",
      background: "white",
      position: "absolute",
      left: "40vw",
      top: "10vh",
      width: "300px",
      height: "300px",
      zIndex: "2",
    };

    return (
      <div style={styles}>
        <div>Fill this out pls</div>
        <div>
          <span>Year:</span>
          <input
            name="year"
            type="number"
            value={this.state.year}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <span>Team Size Cap:</span>
          <input
            name="team_size_cap"
            type="number"
            value={this.state.team_size_cap}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <span>Admins:</span>
          <span>using last year</span>
        </div>
        <button onClick={this.confirmNewIteration}>confirm</button>
        <button onClick={this.cancelNewIteration}>cancel</button>
      </div>
    );
  }
}

export default NewClassIterationModal;
