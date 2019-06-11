import React from "react";
import ClassEntry from "./ClassEntry";

class ClassList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      years: [{year: 2018}, {year: 2019}],
    }
  }

  componentDidMount() {
    // fetch('API_URL' + '/class/years')
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({
    //       loading: false,
    //       years: data.years,
    //     });
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>Year</div>
          <div>Active</div>
          <button>New Iteration</button>
        </div>
        <hr />
        {this.renderMainContent()}
      </div>
    );
  }

  renderMainContent() {
    const { loading, years } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      );
    }
    
    return (
      <div>
        {years.map((el, index) => 
          <ClassEntry key={index} year={el.year} />
        )}
      </div>
    );
  }
}

export default ClassList;
