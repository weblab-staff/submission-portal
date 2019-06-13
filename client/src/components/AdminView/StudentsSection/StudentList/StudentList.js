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
        {first_name: 'Matt', last_name: 'F', github_url: 'mfarejowicz', for_credit: false, tags: []},
      ],
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

  render() {
    const { loading, students } = this.state;

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
        <StudentListHeader />
        {list}
      </div>
    );
  }
}

export default StudentList;
