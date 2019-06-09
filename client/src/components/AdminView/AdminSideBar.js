import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AdminTabButton extends React.Component {
  render() {
    const { activeTab, tabName, tabLabel, icon, onClick } = this.props;

    const styles = {
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100px',
      color: '#6d6d6d',
      cursor: 'pointer',
    };
    if (activeTab === tabName) {
      styles.color = '#ffffff';
      styles.backgroundColor = '#3b66ff';
    }

    return (
      <div style={styles} onClick={() => {onClick(tabName)}} >
        <FontAwesomeIcon icon={['fas', icon]} size='2x'/>
        <span style={{marginTop: '10px'}}>{tabLabel}</span>
      </div>
    );
  }
}

class AdminSideBar extends React.Component {
  render() {
    const { activeTab, year, onClick } = this.props;

    const styles = {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      paddingTop: '20px',
      width: '120px',
      minHeight:'100vh',
      backgroundColor: '#000000',
    }

    return (
      <div style={styles}>
        <AdminTabButton activeTab={activeTab} tabName='iteration' 
          tabLabel={`${year} Class`} icon='calendar-alt' onClick={onClick} />
        <AdminTabButton activeTab={activeTab} tabName='students' 
          tabLabel='Students' icon='user' onClick={onClick} />
        <AdminTabButton activeTab={activeTab} tabName='grade' 
          tabLabel='Grade' icon='highlighter' onClick={onClick} />
        <AdminTabButton activeTab={activeTab} tabName='settings' 
          tabLabel='Settings' icon='cog' onClick={onClick} />
      </div>
    );
  }
}

export default AdminSideBar;
