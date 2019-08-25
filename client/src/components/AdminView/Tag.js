import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Tag.css";

export class Tag extends React.Component {
  render() {
    return (
      <div key={this.props.index} className="u-flex u-marginRight-sm">
        <div className="tag">{this.props.tag}</div>
        <button
          className="tag-delete u-pointer"
          onClick={() => {
            this.props.remove(this.props.tag);
          }}
        >
          <FontAwesomeIcon icon={["fas", "times"]} size="sm" />
        </button>
      </div>
    );
  }
}

export default class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTag: false,
      tag: "",
    };
  }

  addTagAndUpdateState = () => {
    this.props.add(this.state.tag);
    this.setState({ addingTag: false });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      tag: value,
    });
  };

  showTagInput = () => {
    this.setState({
      addingTag: true,
    });
  };

  hideTagInput = () => {
    this.setState({
      addingTag: false,
      tag: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        {this.props.tags.map((tag, index) => (
          <Tag tag={tag} index={index} remove={this.props.remove} />
        ))}
        {this.state.addingTag ? (
          <div>
            <input type="text" onChange={this.handleChange} />
            <button onClick={this.hideTagInput}>cancel</button>
            <button onClick={this.addTagAndUpdateState}>add</button>
          </div>
        ) : (
          <button className="u-pointer tag-add" onClick={this.showTagInput}>
            <FontAwesomeIcon icon={["fas", "plus"]} size="sm" />
          </button>
        )}
      </div>
    );
  }
}
