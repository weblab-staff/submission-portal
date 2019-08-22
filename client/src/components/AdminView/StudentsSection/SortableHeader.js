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
    let newItems;
    if (this.state.sortOrder === SortOrder.ASCENDING) {
      newItems = this.props.items.sort(this.props.sortingFn).reverse();
      this.setState({ sortOrder: SortOrder.DESCENDING });
    } else {
      newItems = this.props.items.sort(this.props.sortingFn);
      this.setState({ sortOrder: SortOrder.ASCENDING });
    }

    this.props.setInfo(newItems);
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
