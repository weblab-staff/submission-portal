import React from "react";
import SearchBar from "../../SearchBar";
import StudentsHeaderListButton from "./StudentsHeaderListButton";
import ActionButton from "./ActionButton";
class StudentsHeader extends React.Component {
  render() {
    const {
      setActiveList,
      selectedStudents,
      selectedTeams,
      deselectStudent
    } = this.props;

    const styles = {
      marginLeft: "20px",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    };

    return (
      <div>
        <h1 className="tabHeader">Students</h1>
        <div style={styles}>
          <div>
            <div>
              {/* <button onClick={this.props.showEmailModal}>EMAIL</button> */}
            </div>
            <div style={{ display: "flex" }}>
              {selectedStudents.map((student, index) => (
                <div key={`selected-${index}`}>
                  <span>{student.first_name}</span>
                  <button onClick={() => deselectStudent(student)}>X</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SearchBar
              onChange={event => this.props.getStudents(event.target.value)}
            />
            <ActionButton
              selectedStudents={selectedStudents}
              selectedTeams={selectedTeams}
            />
          </div>
          <div style={{ display: "flex" }}>
            <StudentsHeaderListButton
              tabLabel="INDIVIDUAL"
              onClick={setActiveList}
            />
            <StudentsHeaderListButton tabLabel="TEAM" onClick={setActiveList} />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default StudentsHeader;
