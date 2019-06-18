import React from "react";
import { get, post } from "../../../../utils";

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
        console.log(data);
        
        this.setState({
          loading: false,
          users: data,
        });
      })
      .catch(err => console.log(err));
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.value;

    this.setState({
      selected: value,
    });
  }

  addAdmin = () => {
    post(`/api/class/${this.props.classId}/admins`, {admin_github_id: this.state.selected})
      .then(status => {
        if (status === 204) {
          this.setState({
            selected: '',
          });
          this.props.refresh();
        } else {
          console.log('you fuked up');
        }
      })
      .catch(err => console.log(err));
  }

  deleteAdmin = (id) => {
    console.log(`Deleting ${id}`)
    // post('/api/class/delete-admin', {id})
    //   .then(status => {
    //     if (status === 204) {
    //       this.props.refresh();
    //     }
    //     return 'You fucked up'
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    const dummyAdmins = [{name: 'Matt', _id:6}, {name: 'jessica', _id:9}];

    if (this.state.loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }
    
    return (
      <div style={{display: 'flex', width: '82vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>
        <div>Admins</div>
        <div>
          <input type="text" list="users" value={this.state.selected} onChange={this.onChange}/>
          <datalist id="users">
            {this.state.users.map((user, index) =>
              <option key={index} value={user.github_id}>{`${user.first_name} ${user.last_name}`}</option>
            )}
          </datalist>
          <button onClick={this.addAdmin}>Add</button>
        </div>
        <div>
          {dummyAdmins.map((el, index) => 
            <div key={index}>{el.name}<button onClick={() => this.deleteAdmin(el._id)}>X</button></div>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsAdmin;