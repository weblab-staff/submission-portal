import React from "react";

class NewClassMilestoneModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      deadline: null,
      handin_link: null,
      responses_link: null,
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    // Sometimes gets the wrong date but i have no idea why
    const value = target.type === "date" ? new Date(target.value) : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  confirmNewMilestone = () => {
    this.props.confirmNewMilestone(this.state);
  };

  cancelNewMilestone = () => {
    this.props.cancelNewMilestone();
  };

  render() {
    const styles = {
      border: "1px solid black",
      background: "white",
      position: "absolute",
      left: "40vw",
      top: "10vh",
      width: "300px",
      height: "300px",
      zIndex: "2",
    };

    return (
      <div style={styles}>
        <div>Fill this out pls</div>
        <div>
          <span>Title:</span>
          <input name="title" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <span>Description:</span>
          <textarea name="description" onChange={this.handleInputChange} />
        </div>
        <div>
          <span>Deadline:</span>
          <input name="deadline" type="date" onChange={this.handleInputChange} />
        </div>
        <div>
          <span>Hand in link:</span>
          <input name="handin_link" type="text" onChange={this.handleInputChange} />
        </div>
        <div>
          <span>Response link:</span>
          <input name="responses_link" type="text" onChange={this.handleInputChange} />
        </div>
        <button onClick={this.confirmNewMilestone}>confirm</button>
        <button onClick={this.cancelNewMilestone}>cancel</button>
      </div>
    );
  }
}

export default NewClassMilestoneModal;
