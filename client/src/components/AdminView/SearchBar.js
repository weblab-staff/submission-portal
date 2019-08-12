import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <span>Search:</span>
        <input onChange={this.props.onChange} type="text" />
      </div>
    );
  }
}

export default SearchBar;
