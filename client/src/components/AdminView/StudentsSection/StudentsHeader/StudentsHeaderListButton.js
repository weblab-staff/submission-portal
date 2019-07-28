import React from "react";

class StudentsHeaderListButton extends React.Component {
  render() {
    const { tabLabel, onClick } = this.props;

    const styles = {
      margin: "0 10px",
      cursor: "pointer",
    };

    return (
      <div style={styles} onClick={() => onClick(tabLabel)}>
        {tabLabel}
      </div>
    );
  }
}

export default StudentsHeaderListButton;
