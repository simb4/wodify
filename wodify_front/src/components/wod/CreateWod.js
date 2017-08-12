import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom'
  
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import RaisedButton from 'material-ui/RaisedButton';
import * as actions from "../../actions/adminActions"

import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import "./wod.css"

class _CreateWod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      date: "",
      program: 1,
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
    if(this.props.wodCreated)
      return 

    console.log("ok")
    let data = {
      date_of_wod: this.state.date,
      program_id: this.state.program
    }
    if(this.state.date !== "")
      this.props.onCreateWod(data)
  }

  redirectToComponents(){
    console.log("ok")
    if(this.props.wodCreated){
      return <Redirect to={{
        pathname: '/admin/createwod/components',
        from: '/admin/createwod'}}/>
    }
    return
  }
  render() {
    return (
     <div>
      <div>
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
              {this.props.programs.map((program) => this.renderProgram(program))}
          </DropDownMenu>
        </div>
      </div>
      <RaisedButton 
        label="Создать WOD"
        onClick={this.handleSubmit}
      />
      {this.redirectToComponents()}
     </div>
    );
  }

}

const mapStateToProps = (state) => ({
  programs: state.admin.programList,
  isLoggedIn: state.auth.isLoggedIn,
  wodCreated: state.admin.isWodCreated,
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