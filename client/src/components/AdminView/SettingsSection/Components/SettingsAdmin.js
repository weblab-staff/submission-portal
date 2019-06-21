import React from "react";
import { get, post, delet } from "../../../../utils";

class SettingsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: null,
      selected: '',
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    get('/api/users')
      .then(data => {
        // console.log(data);
        
        this.setState({
          loading: false,
          users: data,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      selected: value,
    });
  }

  addAdmin = () => {
    post(`/api/class/${this.props.classId}/admins`, {admin_github_username: this.state.selected})
      .then(status => {
        if (status === 204) {          
          this.setState({
            selected: '',
          });
          this.getUsers();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  deleteAdmin = (github_username) => {
    if (confirm(`Are you sure you want to delete?`)) {
      delet(`/api/class/${this.props.classId}/admins`, {admin_github_username:github_username})
        .then(status => {
          if (status === 204) {
            this.getUsers();
          } else {
            console.log('you fuked up');
          }
        })
        .catch(err => console.log(err));
      } else {
        console.log('NOT deleting');
      }
  }

  getAdmins = () => {
    const admins = [];

    for (let user of this.state.users) {
      if (user.is_admin) {
        admins.push(user);
      }
    }

    return admins;
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }

    const admins = this.getAdmins();    
    
    return (
      <div style={{display: 'flex', width: '82vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>
        <div>Admins</div>
        <div>
          <input type="text" list="users" value={this.state.selected} onChange={this.handleChange}/>
          <datalist id="users">
            {this.state.users.map((user, index) =>
              <option key={index} value={user.github_username}>{`${user.first_name} ${user.last_name}`}</option>
            )}
          </datalist>
          <button onClick={this.addAdmin}>Add</button>
        </div>
        <div>
          {admins.map((el, index) => 
            <div key={index}>{`${el.first_name} ${el.last_name}`}<button onClick={() => this.deleteAdmin(el.github_username)}>X</button></div>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsAdmin;