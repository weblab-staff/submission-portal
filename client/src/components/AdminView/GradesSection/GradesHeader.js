import React from "react";
import SearchBar from "../SearchBar";

import "./../AdminHeader.css";

class GradesHeader extends React.Component {
  render() {
    const styles = {
      marginLeft: "20px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    };

    const options = this.props.milestones.map((el, index) => (
      <option key={`ms-option-${index}`} value={el._id}>
        {el.title}
      </option>
    ));
    options.unshift(
      <option key={`ms-option-def`} value="">
        any or no milestone
      </option>
    );

    return (
      <div className="adminHeader-container">
        <h1 className="adminHeader-head">Grade Teams</h1>
        <div className="u-flex u-flexJustifyBetweeen u-flexAlignCenter">
          <div>
            <span>Show teams that</span>
            <select name="selectedSubmit" onChange={this.props.handleChange}>
              <option value="submit">submitted</option>
              <option value="nosubmit">did not submit</option>
            </select>
            <select name="selectedMilestoneId" onChange={this.props.handleChange}>
              {options}
            </select>
            <span>from range</span>
            <input
              name="rangeMin"
              type="number"
              value={this.props.rangeMin}
              onChange={this.props.handleChange}
            />
            <span>to</span>
            <input
              name="rangeMax"
              type="number"
              value={this.props.rangeMax}
              onChange={this.props.handleChange}
            />
          </div>
          <div>
            <SearchBar onChange={(event) => this.props.getTeams(event.target.value)} />
          </div>
        </div>
      </div>
    );
  }
}

export default GradesHeader;
