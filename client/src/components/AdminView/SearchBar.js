import React from "react";

class SearchBar extends React.Component {
  render() {
    return (
      <>
        <input
          className="massAction-search"
          onChange={this.props.onChange}
          placeholder="Search"
          type="text"
        />
      </>
    );
  }
}

export default SearchBar;
