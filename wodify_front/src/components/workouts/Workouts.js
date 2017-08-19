import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as action from '../../actions/adminActions'
import moment from 'moment'

import { TIME } from '../../constants/schedule'
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton'


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
// var coach = ""
var registered = ""
var start = ""
var end = ""
var day = 0

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
    }
  }
  componentWillMount(){
    if(this.props.workouts.length === 0){
      let data = {
        date_of_workout: moment().format('YYYY-MM-DD')
      }
      this.props.getWorkouts(data)
    }

    if(this.props.gyms.length === 0){
      this.props.getGymList()
    }

    if(this.props.coaches.length === 0){
      this.props.getCoaches()
    }
  }

  handleGym = (event, index, gym) => this.setState({gym});
  handleCoach = (event, index, coach) => this.setState({coach});


  handleRequestClose = () => {
    this.setState({
      open: false,
      create: true
    });
  };


  handleTouchTap = (event) => {
    // This prevents ghost click.
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
    var works = this.props.workouts
    WORKOUT = {}
    title = ""
    // coach = ""
    registered = ""
    if(works.length > 0){
      for(var i=0; i<works.length; i++){
        if(works[i].day_id === column){
          for(var j=0; j<works[i-1].workouts.length; j++){
            if(works[i-1].workouts[j].start_time === TIME[row]){
              WORKOUT = works[i-1].workouts[j]
              var stTime = WORKOUT.start_time.substring(0,5)
              title = stTime + " " + WORKOUT.name
              // coach = WORKOUT.coach.first_name + " " + WORKOUT.coach.last_name
              registered = WORKOUT.registered + "/" + WORKOUT.max_people
            }
          }
        } 
      }
    } 
  }

  renderHeader(id){
    var wors = this.props.workouts
    if(wors.length !== 0){
      let days = ["Понедельник", "Вторник", "Среда", "Четверг",
      "Пятница", "Суббота", "Воскресенье"]
      return wors.map((w) => {
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
  }

  changeCoach(){
    console.log("COACH")
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
                {d.registered+"/"+d.max_people}</b></p>
            </div>
          )  
        }
        return ""
      })
    }
  }
  renderWorkouts(time){
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
  }
  renderBody(){
    return TIME.map((r)=>{
      return <TableRow key={r} style={{height: "20px"}} >
        {this.renderWorkouts(r)}
      </TableRow>
    })
  }
  addWorkout(){
    this.setState({create: true})
  }
  editRegistered(){
    console.log("EDIT")
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
  }
  handleChangeCount = (event) => {
    this.setState({maxCount: event.target.value})
  }
  handleSubmit=()=>{
    let data = {
      day_id: day,
      start_time: start,
      end_time: end,
      coach_id: this.state.coach,
      gym_id: this.state.gym,
      name: this.state.name,
      max_people: this.state.maxCount
    }
    this.props.addWorkout(data)
  }
  renderPopover(){
    if(title !== ""){
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
            <ListItem primaryText="Balganym Tulebayeva" />
            <p className="change-coach" onClick={this.changeCoach.bind(this)}>Поменять тренера</p>
            <div className="view-registered">
              <ListItem primaryText={registered} />
              <p className="edit-registered" onClick={this.editRegistered.bind(this)}>Посмотреть</p>
            </div>
          </List>
        </Popover> 
      )
    } 
    // else if(!this.state.create){
    //   return (
    //     <Popover
    //       open={this.state.open}
    //       anchorEl={this.state.anchorEl}
    //       anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
    //       targetOrigin={{horizontal: 'left', vertical: 'top'}}
    //       onRequestClose={this.handleRequestClose}
    //     >
    //       <List>
    //           <ListItem primaryText={title} />
    //           <p 
    //             className="add-workout" 
    //             onClick={this.addWorkout.bind(this)}>
    //               Создать класс
    //           </p>
    //       </List>
    //     </Popover> 
    //   )
    // } 
    else {
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
  render(){
    return(
      <div className="workout-wrapper">
        <p className="page-title">Классы</p>
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
        {this.renderPopover()}
      </div>
    )
  }
}

const mapStateToProps=(state) => ({
  workouts: state.admin.getWorkouts,
  gyms: state.admin.gymsList,
  gettingGyms: state.admin.isGettingGyms,
  coaches: state.admin.coachList,
  isWorkoutCreated: state.admin.isWorkoutCreated
})

const mapDispatchToProps={
  getWorkouts: action.getWeeksWorkout,
  getGymList: action.getGyms,
  getCoaches: action.getCoaches,
  addWorkout: action.addWorkout
}

const Workouts=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workouts);

export default Workouts