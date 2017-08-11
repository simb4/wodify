import React, { Component } from 'react'
import { connect } from "react-redux"
  
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import "./wod.css"

class _CreateWod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      program: 1,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(date){
    this.setState({
      startDate: date,
    })
  }

  handleProgramChange = (event, index, program) => this.setState({program});

  render() {
    return (
     <div>
      <div className="block">
        <p className="label"> Выберите дату</p>
        <DatePicker
          dateFormat="YYYY-MM-DD"
          selected={this.state.startDate}
          onChange={this.handleChange}
          minDate={moment()}
          maxDate={moment().add(6, "days")}
          placeholderText={moment()}
        />
      </div>
      <div className="block">
        <p className="label"> Выберите программу</p>
        <DropDownMenu value={this.state.program} onChange={this.handleProgramChange}>
            <MenuItem value={1} label="CrossFit" primaryText="CrossFit" />
          {/* TUT NADO PROBEGATSYA */}
        </DropDownMenu>
      </div>
      <Link to="/admin/createwod/">
        <FlatButton
            label="Создать WOD"
        />
      </Link>
     </div>
    );
  }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

const CreateWod = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CreateWod);

export default CreateWod