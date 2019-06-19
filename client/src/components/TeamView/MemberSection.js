import React from "react";

class MemberSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: null,
      msg: ""
    }
  }

  handleChange = event => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value
    });
}

  handleSubmit= (event) => {
    const {
      currentTeam
    } = this.props;
    const {
      newMember
    } = this.state;
    event.preventDefault();
    post(`/api/teams/${currentTeam._id}`, {
      user_id: newMember._id,
    })
    .then(response => {
      console.log(response);
      this.setState({
        msg: "Success!"
      })

    })
    .catch(err => console.log(err));
    
  }

  render() {
    const {
      currentTeam
    } = this.props;
    const {
      newMember
    } = this.state;
    return (
      <div>
        MemberSection!
        <div>
        {currentTeam.members.map(userObj => 
            <div
              key={userObj._id}
              >
              {userObj.first_name + " " + userObj.last_name}
            </div>
        )}
        <label>
            Add member:
            <input type="text" name="newMember" value={newMember || ''} onChange={this.handleChange} />
          </label>
        </div>
      </div>
    )
    ;
  }
}

export default MemberSection;
