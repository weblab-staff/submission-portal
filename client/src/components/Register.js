import React from "react";
import { get, post } from "../utils";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      livingGroup: '',
      priorExp: ''
    }
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    get('/api/whoami')
      .then(userObj => {
        this.setState({
          currentUser: userObj
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {
    const inputNode = event.target;
    this.setState({
      [inputNode.name]: inputNode.value
    });
}

  handleSubmit= (event) => {
    const {
      currentUser,
      firstName,
      lastName,
      email,
      gender,
      livingGroup,
    } = this.state;
    event.preventDefault();
    post(`/api/users/${currentUser._id}/update`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      statistics: {
        gender: gender,
        // class_year: Number,
        // experience: Number,
        living_group: livingGroup
      }
    })
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
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
    ;
  }
}

export default Register;
