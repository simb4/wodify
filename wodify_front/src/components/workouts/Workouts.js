import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SERVER_URL } from "../../constants/server"

import * as action from '../../actions/adminActions'
import * as workActions from '../../actions/workoutActions'
import moment from 'moment'

import { TIME } from '../../constants/schedule'
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import './workouts.css'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

var styles = {
  cellStyle: {
    height: "20px",
    border: "1px solid #BCBBC1",
    padding: "2px 5px 2px 5px",
  },
  dialog: {
  }
}

var WORKOUT = {}
var title = ""
var subtitle = ""
var coach = ""
var registered = ""
var start = ""
var end = ""
var day = 0
var people = 0
var work_id = 0
var coach_value = 0
var dates = []
var athletes = []

class _Workouts extends Component {

  constructor(props){
    super(props)
    this.state={
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      showCheckboxes: false,
      abonement: 1,
      status: 1,
      open: false,
      openDialog: false,
      create:false,
      gym: 1,
      coach: 0,
      name: "",
      maxCount: 0,
      change: false,
      cur_week: true,
      value: 0,
      list_athletes: false,
      athlete: 0,
    }
  }
  componentWillMount(){
    if(this.props.workouts.length === 0){
      let data = {
        date_of_workout: moment().format('YYYY-MM-DD')
      }
      this.props.getWorkouts(data)
    }

    if(this.props.workoutsFromDict.length === 0){
      this.props.getWorkoutsFromDict()
    }

    if(this.props.gyms.length === 0){
      this.props.getGymList()
    }

    if(this.props.coaches.length === 0){
      this.props.getCoaches()
    }

    if(this.props.athleteList.length === 0){
      this.props.getAthletes()
    }
  }

  handleGym = (event, index, gym) => this.setState({gym});
  handleCoach = (event, index, coach) => this.setState({coach});
  handleAthlete = (event, index, athlete) => this.setState({athlete});

  handleRequestClose = () => {
    this.setState({
      open: false,
      create: true,
      change: false
    });
  };

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  cellClicked = (row,column,event) => {
    event.preventDefault();
    day = column - 1

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    start = TIME[row]
    end = ""
    if(typeof TIME[row + 1] === "undefined"){
      end = "24:00:00"
    } else {
      end = TIME[row+1]
    }
    if(this.state.value === 0){
      var works = this.props.workouts
      console.log(WORKOUT, 123)
      WORKOUT = {}
      athletes = []
      subtitle = ""
      title = ""
      coach = ""
      registered = ""
      work_id = 0
      people = 0
      if(works.length > 0){
        for(var i=0; i<works.length; i++){
          if(works[i].day_id === column){
            for(var j=0; j<works[i-1].workouts.length; j++){
              if(works[i-1].workouts[j].start_time === TIME[row]){
                WORKOUT = works[i-1].workouts[j]
                var stTime = WORKOUT.start_time.substring(0,5)
                title = stTime + " " + WORKOUT.name
                coach = WORKOUT.coach.first_name + " " + WORKOUT.coach.last_name
                coach_value = WORKOUT.coach.id
                registered = WORKOUT.registered + "/" + WORKOUT.max_people
                work_id = WORKOUT.id
                people = WORKOUT.max_people
                subtitle = WORKOUT.name
                athletes = WORKOUT.athletes
              }
            }
          } 
        }
      } 
    } else {
      works = this.props.workoutsFromDict
      console.log(WORKOUT, 123)
      WORKOUT = {}
      subtitle = ""
      title = ""
      coach = ""
      registered = ""
      athletes = []
      work_id = 0
      people = 0
      if(works.length > 0){
        for(i=0; i<works.length; i++){
          if(works[i].day_id === column){
            for(var j=0; j<works[i-1].workouts.length; j++){
              if(works[i-1].workouts[j].start_time === TIME[row]){
                WORKOUT = works[i-1].workouts[j]
                var stTime = WORKOUT.start_time.substring(0,5)
                title = stTime + " " + WORKOUT.name
                coach = WORKOUT.coach.first_name + " " + WORKOUT.coach.last_name
                coach_value = WORKOUT.coach.id
                registered = "0" + "/" + WORKOUT.max_people
                work_id = WORKOUT.id
                people = WORKOUT.max_people
                subtitle = WORKOUT.name
                athletes = WORKOUT.athletes
              }
            }
          } 
        }
      } 
    }
  }

  renderHeader(){
    let days = ["Понедельник", "Вторник", "Среда", "Четверг",
        "Пятница", "Суббота", "Воскресенье"]
    if(this.state.value === 0){
      var wors = this.props.workouts
      if(wors.length !== 0){
        return wors.map((w, i) => {
          dates[i] = w.date_of_workout
          var date = w.date_of_workout
          var dd = date.substring(8,10)
          var mm = date.substring(5,7)
          return(
            <TableHeaderColumn 
              key={w.day_id} 
              style={{border: "1px solid #BCBBC1"}}>
              <p className="pre-header">{dd}/{mm}</p> 
              <p className="header">{days[w.day_id]}</p>
            </TableHeaderColumn> 
          )
        })
      }
    } else {
      var wors = this.props.workoutsFromDict
      if(wors.length !== 0){
        return wors.map((w, i) => {
          return(
            <TableHeaderColumn 
              key={w.day_id} 
              style={{border: "1px solid #BCBBC1"}}> 
              <p className="header">{days[w.day_id]}</p>
            </TableHeaderColumn> 
          )
        })
      }
    }
  }

  changeCoach(){
    this.setState({change: true})
  }

  renderWork(work, time){
    var w = work.workouts
    if(w.length > 0){
      return w.map((d) => {
        if(d.start_time === time){
          time = time.substring(0,5)
          return(   
            <div className="workout-box" key={d.id} 
              onClick={this.handleTouchTap.bind(this)}>
              <div className="workout-title">
                <p className="bold"><b>{time + " " + d.name}</b></p>
              </div>
                <p className="workout-coach">{d.coach.first_name 
                    + " " + d.coach.last_name}</p>
              <p className="registered"><b>
                {"0/"+d.max_people}</b></p>
            </div>
          )  
        }
        return ""
      })
    }
  }
  renderWorkouts(time){
    if(this.state.value === 0){
      var wors = this.props.workouts
      if(wors.length > 0){
        return wors.map((w)=>{
          return (
            <TableRowColumn 
              key={w.day_id} 
              style={styles.cellStyle}
            >
              {this.renderWork(w, time)}
            </TableRowColumn>
          )
        })
      }
    } else {
      var wors = this.props.workoutsFromDict
      if(wors.length > 0){
        return wors.map((w)=>{
          return (
            <TableRowColumn 
              key={w.day_id} 
              style={styles.cellStyle}
            >
              {this.renderWork(w, time)}
            </TableRowColumn>
          )
        })
      }
    }
  }
  renderBody(){
    return TIME.map((r)=>{
      return <TableRow key={r} style={{minHeight: "44px"}} >
        {this.renderWorkouts(r)}
      </TableRow>
    })
  }
  addWorkout(){
    this.setState({create: true})
  }
  editRegistered(){
    this.setState({list_athletes: true})
  }
  handleDelete(){
    // console.log(JSON.parse(work_id))
    work_id = JSON.parse(work_id)
    console.log(work_id)
    if(this.state.value === 0){
      this.props.deleteWorkout({workout_id: work_id })
    } else {
      this.props.deleteWorkoutFromDict({workout_id: work_id})
    }
  }
  getGyms(){
    return this.props.gyms.map((g) => {
      return(
        <MenuItem key={g.id} value={g.id} primaryText={g.name} />
      )
    })
  }
  getCoaches(){
    return this.props.coaches.map((c) => {
      return(
        <MenuItem key={c.id} value={c.id} 
          primaryText={c.first_name + " " + c.last_name} />
      )
    })
  }
  handleChangeName = (event) => {
    this.setState({name: event.target.value})
    subtitle = ""
  }
  handleChangeCount = (event) => {
    this.setState({maxCount: event.target.value})
  }

  handleSave=()=>{
    let data = {
      workout_id: work_id,
      name: subtitle!=="" ? subtitle : this.state.name,
      coach_id: this.state.coach ? this.state.coach : null,
      max_people: this.state.maxCount!==0 ? this.state.maxCount : people
    }

    // console.log(data)

    if(this.state.value === 0){
      this.props.updateWorkout(data)
    } else {
      this.props.updateMainWorkout(data)
    }
    this.setState({
      open: false,
      openDialog: false,
      create:false,
      gym: 1,
      coach: 0,
      name: "",
      maxCount: 0,
      change: false,
    })

    data = {
      date_of_workout: moment().format('YYYY-MM-DD')
    }
    this.props.getWorkouts(data)
  }

  handleSign=()=>{
    let data = {
      workout_id: work_id,
      athlete_id: this.state.athlete
    }

    this.props.signForWorkout(data)

    this.setState({athlete: 0})

  }

  handleSubmit=()=>{
   
    if(this.state.value === 0){
      let data = {
        date_of_workout: dates[day], // надо поменять
        start_time: start,
        end_time: end,
        coach_id: this.state.coach,
        // gym_id: this.state.gym,
        name: this.state.name,
        max_people: this.state.maxCount
      }
      this.props.addWorkout(data)
    } else {
       let data = {
        date_of_workout: dates[day],
        start_time: start,
        end_time: end,
        coach_id: this.state.coach,
        day_id: day,
        name: this.state.name,
        max_people: this.state.maxCount
      }
      this.props.addWorkoutToDict(data)
    }
    this.setState({
      open: false,
      openDialog: false,
      create:false,
      gym: 1,
      coach: 0,
      name: "",
      maxCount: 0,
      change: false,
    })
  }

  handleSaveEdit = () => {
    this.setState({list_athletes: false})
  }

  renderPopover(){
    if(this.state.change){
      return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div className="create-box">
            <h3>Редактирование класса</h3>
            <TextField
              defaultValue={start}
              floatingLabelText="Время начала урока"
              fullWidth={false}
              disabled={true}
            /><br/>
            <TextField
              floatingLabelText="Название класса"
              value={subtitle!=="" ? subtitle : this.state.name}
              onChange={this.handleChangeName.bind(this)}
            /><br/>
            <TextField
              floatingLabelText="Максимальное кол-во атлетов"
              value={this.state.maxCount !== 0 ? this.state.maxCount : people}
              onChange={this.handleChangeCount.bind(this)}
            /><br/>
            <SelectField
              floatingLabelText="Выберите тренера"
              value={this.state.coach ? this.state.coach : coach_value}
              onChange={this.handleCoach}
            >
              {this.getCoaches()}
            </SelectField><br/>
            <FlatButton 
              className="create-workout-btn" 
              label="Сохранить" 
              onClick={this.handleSave.bind(this)}
            />
          </div>
        </Popover> 
      )
    }else if(this.state.list_athletes){
      return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div className="create-box">
            <h3>Редактирование класса</h3>
            <SelectField
              floatingLabelText="Выберите атлета"
              value={this.state.athlete}
              onChange={this.handleAthlete}
            >
              {this.props.athleteList.map(a => {
                return(
                  <MenuItem key={a.id} value={a.id} primaryText={a.first_name}/>
                )
              })}
            </SelectField>
            <FlatButton 
              className="create-workout-btn" 
              label="Записать" 
              onClick={this.handleSign.bind(this)}
            />
          </div>
          <Divider/>
          {athletes.map(m => {
            return (
              <div key={m.id} className="athleteList">
                <img className="avaList" src={SERVER_URL + m.avatar_url}/>
                <p>{m.first_name + " " + m.last_name}</p>
              </div>
            )
          })}
          <FlatButton 
            className="create-workout-btn" 
            label="Cохранить"
            onClick={this.handleSaveEdit.bind(this)}
          />
        </Popover> 
      )
    }else if(this.state.value !== 0 && title != ""){
      console.log("Bakosya")
      return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            <ListItem primaryText={title} />
            <Divider inset={true}/>
            <ListItem primaryText={coach} />
            <Divider inset={true}/>
            <div className="view-registered">
              <p className="edit-registered">Макс. кол-во</p>
                <ListItem primaryText={registered.substring(2,4)} />
            </div>
            <p className="change-coach" 
              onClick={this.changeCoach.bind(this)}>Редактировать</p>
            <p className="delete-workout" 
                onClick={this.handleDelete.bind(this)}>Удалить</p>
          </List>
        </Popover> 
      )
    } else if(title !== ""){
      return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            <ListItem primaryText={title} />
            <Divider inset={true}/>
            <ListItem primaryText={coach} />
            <Divider inset={true}/>
            <div className="view-registered">
              <ListItem primaryText={registered} />
              <p className="edit-registered" 
                onClick={this.editRegistered.bind(this)}>Посмотреть</p>
            </div>
            <p className="change-coach" 
              onClick={this.changeCoach.bind(this)}>Редактировать</p>
            <p className="delete-workout" 
                onClick={this.handleDelete.bind(this)}>Удалить</p>
          </List>
        </Popover> 
      )
    } else {
      return (
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div className="create-box">
            <h3>Создать класс</h3>
            <TextField
              defaultValue={start}
              floatingLabelText="Время начала урока"
              fullWidth={false}
              disabled={true}
            /><br/>
            <TextField
              floatingLabelText="Название класса"
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)}
            /><br/>
            <TextField
              floatingLabelText="Максимальное кол-во атлетов"
              value={this.state.maxCount}
              onChange={this.handleChangeCount.bind(this)}
            /><br/>
            <SelectField
              floatingLabelText="Выберите зал"
              value={this.state.gym}
              onChange={this.handleGym}
            >
              {this.getGyms()}
            </SelectField><br/>
            <SelectField
              floatingLabelText="Выберите тренера"
              value={this.state.coach}
              onChange={this.handleCoach}
            >
              {this.getCoaches()}
            </SelectField><br/>
            <FlatButton 
              className="create-workout-btn" 
              label="Создать" 
              onClick={this.handleSubmit.bind(this)}
            />
          </div>
        </Popover> 
      )
    }
  }
  renderHours(){
    return TIME.map((t) => {
      return (
        <TableRow key={t}>
          <TableRowColumn >{t}</TableRowColumn>
        </TableRow>
      )
    })
  }

  changeWorkout = (event, value) => {
    this.setState({value: value})
  }
  render(){
    return(
      <div className="workout-wrapper">
        <p className="page-title">Классы</p>
        <RadioButtonGroup 
          name="current" 
          defaultSelected={0}
          onChange={this.changeWorkout}>
          <RadioButton
            value={0}
            label="Текущая неделя"
          />
          <RadioButton
            value={1}
            label="Все недели"
          />
        </RadioButtonGroup><br/>
        <div className="tables">
          <div className="workout-hours">
            <Table 
              fixedHeader={this.state.fixedHeader}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
              style={{backgroundColor: "whitesmoke", border: "none"}}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
                style={{border: "none"}}
              >
                <TableRow 
                  style={{border: "none", height: "24px"}}
                >
                  <TableHeaderColumn 
                    style={{border: "none", height: "64px"}}
                  >
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody 
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
                style={{border: "none", height: "40px"}}
                >
                    {this.renderHours()}
                  </TableBody>
            </Table>
          </div>
          <div className="workout-table">
            <Table 
              style={{cursor: "pointer"}}
              onCellClick={this.cellClicked}
              fixedHeader={this.state.fixedHeader}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  {this.renderHeader()}
                </TableRow>
              </TableHeader>
              <TableBody 
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {this.renderBody()}
              </TableBody> 
            </Table>
          </div>
        </div>
        {this.renderPopover()}
      </div>
    )
  }
}

const mapStateToProps=(state) => ({
  workoutsFromDict: state.work.workoutsFromDict,
  workouts: state.admin.getWorkouts,
  gyms: state.admin.gymsList,
  gettingGyms: state.admin.isGettingGyms,
  coaches: state.admin.coachList,
  isWorkoutCreated: state.admin.isWorkoutCreated,
  deleted: state.work.deleteWorkout,
  deletedFromDict: state.work.deleteWorkoutFromDict,
  addedToDict: state.work.isWorkoutAddedToDict,
  athleteList: state.admin.athleteList,
  signed: state.work.signForWorkout,
})

const mapDispatchToProps={
  getWorkoutsFromDict: workActions.getWorkoutsFromDict,
  getWorkouts: action.getWeeksWorkout,
  getGymList: action.getGyms,
  getCoaches: action.getCoaches,
  addWorkout: action.addWorkout,
  updateWorkout: action.updateWorkout,
  updateMainWorkout: workActions.updateWorkoutInDict,
  deleteWorkout: workActions.deleteWorkouts,
  deleteWorkoutFromDict: workActions.deleteWorkoutFromDict,
  addWorkoutToDict: workActions.addWorkoutToDict,
  getAthletes: action.getAthletes,
  signForWorkout: workActions.signForWorkout,
}

const Workouts=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workouts);

export default Workouts