import React from "react";
import SearchBar from "../SearchBar";

class GradesHeader extends React.Component {
  render() {
    const styles = {
      marginLeft: '20px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }

    return (
      <div>
        <h1 className="tabHeader">Grade Teams</h1>
        <div style={styles}>
          <div>
            <span>Show teams that</span>
            <select>
              <option value="submit">submitted</option>
              <option value="nosubmit">did not submit</option>
            </select>
            <select>
              {this.props.milestones.map((el, index) => 
                <option key={`ms-option-${index}`}value={el.title}>{el.title}</option>
              )}
            </select>
            <span>from range</span>
            <input type="number" min="1" max={this.props.teams.length} value={this.props.rangeMin} onChange={this.props.changeMin}></input>
            <span>to</span>
            <input type="number" min="1" max={this.props.teams.length} value={this.props.rangeMax} onChange={this.props.changeMax}></input>
          </div>
          <div>
            <SearchBar />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default GradesHeader;
