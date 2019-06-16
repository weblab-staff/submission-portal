import React from "react";
import NewMilestoneModal from "./NewMilestoneModal";
import { get, post } from "../../../utils";

class MilestoneRow extends React.Component {
  changeHandinLink = (event) => {
    const target = event.target;
    const value = target.value;
    post(`/api/milestones/${this.props.info._id}/update`, {handin_link: value})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        }
        return 'You fucked up'
      })
      .catch(err => console.log(err));
  }

  changeDeadline = (event) => {
    const target = event.target;
    const value = new Date(target.value);
    post(`/api/milestones/${this.props.info._id}/update`, {deadline: value})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        }
        return 'You fucked up'
      })
      .catch(err => console.log(err));
  }

  changeSubmissionStatus = (event) => {
    const target = event.target;
    const value = target.checked;
    post(`/api/milestones/${this.props.info._id}/update`, {submission_closed: !value})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        }
        return 'You fucked up'
      })
      .catch(err => console.log(err));
  }

  changeAutogradeStatus = (event) => {
    const target = event.target;
    const value = target.checked;
    post(`/api/milestones/${this.props.info._id}/set-autograde`, {autograde: value})
      .then(status => {
        if (status === 204) {
          this.props.refresh();
        }
        return 'You fucked up'
      })
      .catch(err => console.log(err));
  }

  render() {
    const { index, info } = this.props;

    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', width: '15vw'}}>
          <div>{info.title}</div>
        </div>
        <div style={{display: 'flex', width: '20vw'}}>
          <input type="text" onChange={this.changeHandinLink} value={info.handin_link}></input>
        </div>
        <div style={{display: 'flex', width: '10vw'}}>
          <input type="date" onChange={this.changeDeadline} value={info.deadline ? info.deadline.substring(0, 10) : ''}></input>
        </div>
        <div style={{display: 'flex', width: '10vw'}}>
          <input type="checkbox" onChange={this.changeSubmissionStatus} checked={!info.submission_closed}></input>
        </div>
        <div style={{display: 'flex', width: '10vw'}}>
          <input type="checkbox" onChange={this.changeAutogradeStatus} checked={info.autograde}></input>
        </div>
      </div>
    );
  }
}

class SettingsMilestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      milestones: [],
      modalActive: false,
    }
  }

  componentDidMount() {
    this.getMilestones();
  }

  getMilestones = () => {
    get('/api/milestones', { year: this.props.year })
      .then(data => {        
        this.setState({
          loading: false,
          milestones: data,
        });
      })
      .catch(err => console.log(err));
  }

  openNewMilestoneModal = () => {
    this.setState({ modalActive: true });
  }

  confirmNewMilestone = (body) => {
    console.log('Making new milestone!');
    post('/api/milestones', body)
      .then(status => {
        if (status === 204) {
          this.getMilestones();
        }
        return 'You fucked up'
      })
      .catch(err => console.log(err));
    this.setState({ modalActive: false });
  }

  cancelNewMilestone = () => {
    this.setState({ modalActive: false });
  }

  render() {
    const { loading, milestones, modalActive } = this.state;

    if (loading) {
      return (
        <div>
          Loading!
        </div>
      );
    }

    return (
      <div style={{display: 'flex', width: '82vw', height:'20vh', border: '1px solid black', margin: '1vh 1vw'}}>
        {modalActive  &&
          <NewMilestoneModal
            confirmNewMilestone={this.confirmNewMilestone} 
            cancelNewMilestone={this.cancelNewMilestone} 
          />
        }
        <div>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', width: '15vw'}}>
              <div>Milestone</div>
            </div>
            <div style={{display: 'flex', width: '20vw'}}>
              <div>Link</div>
            </div>
            <div style={{display: 'flex', width: '10vw'}}>
              <div>Deadline</div>
            </div>
            <div style={{display: 'flex', width: '10vw'}}>
              <div>Open</div>
            </div>
            <div style={{display: 'flex', width: '10vw'}}>
              <div>Auto-grade</div>
            </div>
            <div style={{display: 'flex', width: '10vw'}}>
              <button onClick={this.openNewMilestoneModal}>NEW MILESTONE</button>
            </div>
          </div>
          {milestones.map((el, index) =>
            <MilestoneRow key={index} refresh={this.getMilestones} index={index} info={el}/>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsMilestones;
