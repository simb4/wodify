import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'


import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class Athlete extends Component {
  render(){
    return (
      <TableRow>
        <TableRowColumn>{this.props.athlete.first_name + " " +
         this.props.athlete.last_name}</TableRowColumn>
        <TableRowColumn>-</TableRowColumn>
        <TableRowColumn>{this.props.athlete.phone_number}</TableRowColumn>
        <TableRowColumn>
          <Link to="/admin/athletes">
            <FlatButton 
              className="open-btn" 
              label="открыть" 
            />
          </Link>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default Athlete