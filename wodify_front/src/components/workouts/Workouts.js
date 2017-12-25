import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import 'moment-timezone'
import ruLocale from 'moment/locale/ru'
moment.updateLocale('ru', ruLocale)
BigCalendar.momentLocalizer(moment)

import * as workoutActions from '../../actions/workoutActions'
import './workouts.css'

let counts = []
for (let i = 1; i <= 30; i++) counts.push(i);

function Workout({ event }) {
  let w = event;
  let coachName = !w.coach ? 'не указано' : w.coach.full_name || w.coach.email; 
  return (
    <span className="cell">
      <div className="cell-title">
        <div className="cell-name"> {w.name} </div>
        <div className="cell-count">{w.users_count}/{w.max_users}</div>
      </div>
      <div className="cell-coach">{coachName} </div>
    </span>
  )
}

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.slot.name || '',
      description: this.props.slot.description || '',
      max_users: this.props.slot.max_users || 10,
      coach_id: this.props.slot.coach_id || this.props.coaches[0].id,
    }
  }
  handleDelete() {

  }
  handleSubmit() {
    let { name, description, coach_id, max_users } = this.state;
    this.props.onAddWorkout({
      gym_id: this.props.slot.gym_id,
      timestamp_start: this.props.slot.start.toISOString().split('.')[0],
      timestamp_end: this.props.slot.end.toISOString().split('.')[0],
      name, description, coach_id, max_users,
    });
  }
  render() {
    let actions = [
      <FlatButton
        label="Отмена"
        secondary={true}
        onClick={this.props.close}
      />,
      <FlatButton
        label={this.props.isEdit ? "Сохранить" : "Добавить"}
        primary={true}
        onClick={this.handleSubmit.bind(this)}
      />,
    ];
    if (this.props.isEdit) {
      actions = [
        <FlatButton
          label="Удалить"
          default={true}
          onClick={this.handleDelete.bind(this)}
        />,
      ...actions];
    }
    return (
        <Dialog
          open={true}
          title="Добавить тренировку"
          actions={actions}
          modal={false}
          onRequestClose={this.props.close}
          bodyStyle={{ overflow: 'scroll', height: 'auto' }}
        >
        <div>
          <div className="add-form-row">
            <TextField
              value={moment(this.props.slot.start).format('DD.MM.YY HH:mm')}
              disabled={true}
              floatingLabelText="Время начала"/>
            <TextField
              value={moment(this.props.slot.end).format('DD.MM.YY HH:mm')}
              disabled={true}
              floatingLabelText="Время конца"/>
          </div>
          <TextField
            value={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            fullWidth={true}
            floatingLabelText="Название"
          />
          <TextField
            value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}
            floatingLabelText="Описание"
            fullWidth={true}
            multiLine={true}
          />
          <div className="add-form-row">
            <SelectField
              floatingLabelText="Тренер"
              value={this.state.coach_id}
              onChange={(e,i,v)=> this.setState({ coach_id: v })}
            >
              <MenuItem value={null} primaryText="" />
              {this.props.coaches.map(coach => <MenuItem key={coach.id} value={coach.id} primaryText={coach.full_name} />)}
            </SelectField>

            <SelectField
              floatingLabelText="Количество"
              value={this.state.max_users}
              onChange={(e,i,v)=> this.setState({ max_users: v })}
            >
              <MenuItem value={null} primaryText="" />
              {counts.map(c => <MenuItem key={c} value={c} primaryText={c} />)}
            </SelectField>
          </div>
          </div>
        </Dialog>
    );
  }
}

class _Workouts extends Component {

  constructor(props){
    super(props)
    this.state = {
      openAdd: false,
      openEdit: false,
      slot: {},
    }
  }
  handleCloseModal = () => {
    this.setState({ openAdd: false, openEdit: false });
  };
  componentDidMount() {
    let today = new Date();
    let start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0,0,0)
    let end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,59,59);
    end.setDate(start.getDate() + 14);

    this.props.onGetWorkouts({
      gym_id: this.props.user.gym.id,
      timestamp_start: start.toISOString().split('.')[0],
      timestamp_end: end.toISOString().split('.')[0],
    });

    this.props.onGetCoaches({ gym_id: this.props.user.gym.id })
  }
  selectSlot(slot) {
    this.setState({ openAdd: true, slot: {
      ...slot,
      gym_id: this.props.gym_id,
    }});
  }
  editSlot(slot) {
    console.log('ahaha', slot);
    this.setState({ openEdit: true, slot: {
      ...slot,
      coach_id: slot.coach.id,
      gym_id: this.props.gym_id,
    }});
  }

  render(){
    let today = new Date();
    return(
      <div className="workout-wrapper">
        <p className="page-title">Классы</p>
        <div className="tables">
          <div className="workout-table">
            <BigCalendar
              selectable
              onSelectEvent={(slot) => this.editSlot(slot)}
              onSelectSlot={(slot) => this.selectSlot(slot)}
              events={this.props.workouts}
              // views={['week', 'day', 'agenda']}
              defaultView='week'
              popup={true}
              components={{ event: Workout }}
              min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6,0,0)}
              max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23,0,0)}
              />
          </div>
        </div>
        {this.state.openAdd &&
          <AddDialog
            onAddWorkout={this.props.onAddWorkout}
            coaches={this.props.coaches}
            slot={this.state.slot}
            close={this.handleCloseModal} />}
        {this.state.openEdit &&
          <AddDialog
            isEdit={true}
            onAddWorkout={this.props.onEditWorkout}
            coaches={this.props.coaches}
            slot={this.state.slot}
            close={this.handleCloseModal} />}
      </div>
    )
  }
}

const mapStateToProps=(state) => ({
  user: state.user.user,
  workouts: state.workout.workouts,
  coaches: state.workout.coaches
})

const mapDispatchToProps={
  onGetWorkouts: workoutActions.getWorkouts,
  onAddWorkout: workoutActions.addWorkout,
  onGetCoaches: workoutActions.getCoaches,
}

const Workouts=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workouts);

export default Workouts