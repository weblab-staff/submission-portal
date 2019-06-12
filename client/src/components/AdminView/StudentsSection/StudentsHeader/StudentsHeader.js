import React from "react";
import SearchBar from "../../SearchBar";
import StudentsHeaderListButton from "./StudentsHeaderListButton";

class StudentsHeader extends React.Component {
  render() {
    const styles = {
      marginLeft: '20px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }

    return (
      <div>
        <h1 className="tabHeader">Students</h1>
        <div style={styles}>
          <div>
            <input style={{width: '30vw'}}></input>
            <button>EMAIL</button>
          </div>
          <div>
            <SearchBar />
          </div>
          <div style={{display: 'flex'}}>
            <StudentsHeaderListButton tabLabel='INDIVIDUAL' onClick={this.props.setActiveList} />
            <StudentsHeaderListButton tabLabel='TEAM' onClick={this.props.setActiveList} />
          </div>
        </div>
      </div>
    );
  }
}

export default StudentsHeader;
