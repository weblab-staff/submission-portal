import React from "react";
import StudentListHeader from "./StudentListHeader";
import StudentEntry from "./StudentEntry";
import { get } from "../../../../utils";

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      students: [
        {first_name: 'Jessica', last_name: 'Tang', github_url: 'jynnie', team: 'Plix', for_credit: true, tags: ['Student', 'test']},
        {first_name: 'matt', last_name: 'F', github_url: 'mfarejowicz', for_credit: false, tags: []},
      ],
      activeSort: null,
      sortOrder: 'NONE',
    };
  }

  componentDidMount() {
    // this.getStudents();
  }

  getStudents = () => {
    get('/api/users/')
      .then(data => {
        if (data) {
          console.log(data);
          
          this.setState({
            loading: false,
            students: data,
          });
        } else {
          this.setState({
            loading: false,
            students: null,
          });
        }
      })
      .catch(err => console.log(err));
  }

  genSortFunction(param, sortOrder) {
    if (sortOrder === 'ASC') {
      if (param === 'for_credit') {
        return (a, b) => a[param] - b[param];
      }

      return (a, b) => a[param].localeCompare(b[param]);
    } else {
      if (param === 'for_credit') {
        return (a, b) => b[param] - a[param];
      }

      return (a, b) => b[param].localeCompare(a[param]);
    }
  }

  handleSort = (param) => {
    let sortOrder = 'ASC';
    if (this.state.activeSort === param && this.state.sortOrder === 'ASC') {
      sortOrder = 'DES';
    }

    let sortedStudents = [...this.state.students];
    sortedStudents.sort(this.genSortFunction(param, sortOrder));    

    this.setState({
      students: sortedStudents,
      activeSort: param,
      sortOrder
    });
  }

  render() {
    const { loading, students, activeSort, sortOrder } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      )
    }

    let list = (
      <div>
        No students!
      </div>
    );
    if (students && students.length > 0) {
      list = students.map((el, index) => 
        <StudentEntry key={index} info={el} />
      );
    }
    
    return (
      <div>
        <StudentListHeader 
          activeSort={activeSort} sortOrder={sortOrder}
          handleSort={this.handleSort} 
        />
        {list}
      </div>
    );
  }
}

export default StudentList;
