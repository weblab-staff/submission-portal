import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <div className="u-flex u-pointer" onClick={this.handleSort}>
        <div>{this.props.label}</div>
        {this.renderSortIcon()}
      </div>
    );
  }

  renderSortIcon = () => {
    if (this.state.sortOrder === SortOrder.ASCENDING) {
      return <FontAwesomeIcon className="u-marginLeft-md" icon={["fas", "sort-up"]} size="sm" />;
    } else {
      return <FontAwesomeIcon className="u-marginLeft-md" icon={["fas", "sort-down"]} size="sm" />;
    }
  };
}

export default SortableHeader;
