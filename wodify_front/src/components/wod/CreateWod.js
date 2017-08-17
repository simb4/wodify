import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
  
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import Loader from "../elements/Loader"
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from "../../actions/adminActions"

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import "./wod.css"

var alerted = false

class _CreateWod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      date: "",
      program: 0,
      created: false
    };
    this.handleChange = this.handleChange.bind(this)
    this.renderProgram = this.renderProgram.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirectToComponents = this.redirectToComponents.bind(this)
  }
  componentWillMount(){
    if (!this.props.programs.length) {
      this.props.getPrograms();
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isLoading === "created"){
      this.setState({created: true})
    }
  }
  handleChange(date){
    this.setState({
      startDate: date,
      date: date.format('YYYY-MM-DD'),
    })
  }
  renderProgram(program){
    return <MenuItem 
      value={program.id} 
      label={program.name} 
      primaryText={program.name} 
      key={program.id}
    />
  }

  handleProgramChange = (event, index, program) => this.setState({program});

  handleSubmit(){

    let data = {
      date_of_wod: this.state.date,
      program_id: this.state.program
    }
    if(this.state.date !== ""){
      this.props.onCreateWod(data)
    }
  }

  redirectToComponents(){
    if(this.state.created){
      return <Redirect to={{
        pathname: '/admin/createwod/add_sections',
        from: '/admin/createwod'}}/>
    }
    return
  }
  renderLoader(){
    var message = this.props.isLoading
    if(message === "started"){
      alerted = false
      return (
        <Loader size={80} thickness={7}/>
      )
    } else if(!alerted && message !== "created" && message !== ""){
      alert(this.props.isLoading)
      alerted = true
      return
    } else if(message === "created"){
      alerted = false
      return
    }
  }

  render() {
    return (
      <div className="box-wrapper"> 
        <div className="box">
        <h1 className="box-title"> Создать WOD </h1>
          <div className="box-fields">
            <div className="block">
              <p className="label"> Выберите дату</p>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  showYearDropdown
                  dateFormatCalendar="MMMM"
                  minDate={moment()}
                  maxDate={moment().add(6, "days")}
                />
            </div>
            <div className="block">
              <p className="label"> Выберите программу</p>
              <DropDownMenu value={this.state.program} onChange={this.handleProgramChange}>
                  <MenuItem value={0} label="----" primaryText="----"/>
                  {this.props.programs.map((program) => this.renderProgram(program))}
              </DropDownMenu>
            </div>
          </div>
          <RaisedButton 
            label="Создать WOD"
            onClick={this.handleSubmit}
            className="createwod"
          />
          {this.redirectToComponents()}
          {this.renderLoader()}
         </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  programs: state.admin.programList,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.admin.creatingWod,
  // wodCreated: state.admin.isWodCreated,
})

const mapDispatchToProps = {
  getPrograms: actions.getPrograms,
  onCreateWod: actions.createWod
}

const CreateWod = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreateWod);

export default CreateWod