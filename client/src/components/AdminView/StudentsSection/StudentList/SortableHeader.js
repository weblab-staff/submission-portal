import React from "react";

export const SortOrder = {
  NONE: "NONE",
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};

class SortableHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortOrder: SortOrder.NONE,
    };
  }

  handleSort = () => {
    let newItems;
    if (this.state.sortOrder === SortOrder.ASCENDING) {
      newItems = this.props.items.sort(this.props.sortingFn).reverse();
      this.setState({ sortOrder: SortOrder.DESCENDING });
    } else {
      newItems = this.props.items.sort(this.props.sortingFn);
      this.setState({ sortOrder: SortOrder.ASCENDING });
    }

    this.props.afterSort(newItems);
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
    switch (this.state.sortOrder) {
      case SortOrder.ASCENDING:
        text = "ASC";
        break;
      case SortOrder.DESCENDING:
        text = "DES";
        break;
      default:
        text = "O";
        break;
    }

    return <div>{text}</div>;
  };
}

export default SortableHeader;
