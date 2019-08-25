import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Tag.css";

/**
 * PROPS
 *
 * add            (tag) => void  // called when click add new tag
 * remove         (tag) => void  // called when click an X on a tag
 * tags           any[]       // used to identify tag to add/remove
 * displayTags?   string[]
 * datalist?      {string: string} // if provided will generate a datalist on add input
 */

export const Tag = ({ tag, display, index, remove }) => (
  <div key={index} className="u-flex u-marginRight-sm">
    <div className="tag">{display != undefined ? display : tag}</div>
    <button
      className="tag-delete u-pointer"
      onClick={() => {
        remove(tag);
      }}
    >
      <FontAwesomeIcon icon={["fas", "times"]} size="sm" />
    </button>
  </div>
);

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
          <Tag
            tag={tag}
            display={this.props.displayTags && this.props.displayTags[index]}
            index={index}
            remove={this.props.remove}
          />
        ))}
        {this.state.addingTag ? (
          <div>
            <input
              list={this.props.datalist ? "data" : null}
              type="text"
              onChange={this.handleChange}
            />
            {this.props.datalist && (
              <datalist id="data">
                {Object.entries(this.props.datalist).map(([key, description], index) => (
                  <option key={index} value={key}>
                    {description}
                  </option>
                ))}
              </datalist>
            )}
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
