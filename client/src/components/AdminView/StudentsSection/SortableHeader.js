import React from "react";

export const SortOrder = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOrder: SortOrder.ASCENDING,
    };
  }

  handleSort = () => {
    if (this.state.sortOrder === SortOrder.ASCENDING) {
      this.props.handleSort((a, b) => -this.props.sortingFn(a, b));
      this.setState({ sortOrder: SortOrder.DESCENDING });
    } else {
      this.props.handleSort(this.props.sortingFn);
      this.setState({ sortOrder: SortOrder.ASCENDING });
    }
  };

  render() {
    return (
      <div style={{ display: "flex", width: "10vw" }} onClick={this.handleSort}>
        <div style={{ marginRight: "5px" }}>{this.props.label}</div>
        {this.renderSortIcon()}
      </div>
    );
  }

  renderSortIcon = () => {
    let text;
    if (this.state.sortOrder === SortOrder.ASCENDING) {
      text = "ASC";
    } else {
      text = "DES";
    }

    return <div>{text}</div>;
  };
}

export default SortableHeader;
