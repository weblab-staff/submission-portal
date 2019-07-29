import React from "react";
import { Redirect } from 'react-router-dom';
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
      priorExp: '',
      forCredit: '',
      redirect: false
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
      experience,
      forCredit
    } = this.state;
    event.preventDefault();
    post(`/api/users/${currentUser._id}/update`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      for_credit: forCredit,
      statistics: {
        gender: gender,
        // class_year: Number,
        experience: experience,
        living_group: livingGroup
      }
    })
    .then(response => {
      console.log(response);
      this.setState({
        redirect: response === 204
      })

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
      redirect
    } = this.state;

    if (redirect) {
      return (<Redirect to="/" />)
    }

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
          <label>
            Experience:
            <input type="radio" name="experience" value="0" onChange={this.handleChange}/>
            <input type="radio" name="experience" value="1" onChange={this.handleChange}/>
            <input type="radio" name="experience" value="2" onChange={this.handleChange}/>
            <input type="radio" name="experience" value="3" onChange={this.handleChange}/>
            <input type="radio" name="experience" value="4" onChange={this.handleChange}/>
          </label>
          <label>
            For Credit:
            <input type="radio" name="forCredit" value={true} onChange={this.handleChange}/>
            <input type="radio" name="forCredit" value={false} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    )
    ;
  }
}

export default Register;
