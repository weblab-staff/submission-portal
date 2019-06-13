import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      livingGroup: '',
      priorExp: ''
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
      currentUser
    } = this.props;
    const {
      firstName,
      lastName,
      email,
      gender,
      livingGroup,
    } = this.state;
    event.preventDefault();
    post(`/api/users/${currentUser._id}/update`), {
      firstName,
      lastName,
      email,
      gender,
      livingGroup
    }
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
    
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      gender,
      livingGroup,
      priorExp,
    } = this.state;

    return (
      <div>
        Register!
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={firstName} onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={lastName} onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" name="email" value={email} onChange={this.handleChange} />
          </label>
          <label>
            Gender:
            <select name="gender" value={gender} onChange={this.handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Living Group:
            <input type="text" name="livingGroup" value={livingGroup} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
    ;
  }
}

export default Register;
