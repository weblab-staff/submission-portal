import React from "react";
import ClassIterationsSection from './ClassIterationsSection/ClassIterationsSection';
import StudentsSection from './StudentsSection/StudentsSection';
import GradesSection from './GradesSection/GradesSection';
import SettingsSection from './SettingsSection/SettingsSection';

class AdminBody extends React.Component {
  render() {
    const styles = {
      width: 'calc(100vw - 120px)'
    }

    return (
      <div style={styles}>
        {this.props.activeTab === 'iteration' && <ClassIterationsSection setViewedYear={this.props.setViewedYear} />}
        {this.props.activeTab === 'students' && <StudentsSection />}
        {this.props.activeTab === 'grade' && <GradesSection />}
        {this.props.activeTab === 'settings' && <SettingsSection year={this.props.year} />}
      </div>
    );
  }
}

export default AdminBody;
