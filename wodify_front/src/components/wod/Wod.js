import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../elements/Loader';
import { Link } from 'react-router-dom'

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton';

import "./wod.css"
import ScrollToTop from 'react-scroll-up';
import Waypoint from 'react-waypoint';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import * as actions from '../../actions/adminActions';

class _Wod extends Component {
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
    }
  }
  renderBody(){
    // this.props.wodList.map((wod) => this.renderWod(wod)) 
    return <TableBody 
      displayRowCheckbox={this.state.showCheckboxes}
      deselectOnClickaway={this.state.deselectOnClickaway}
      showRowHover={this.state.showRowHover}
      stripedRows={this.state.stripedRows}
    >
      <TableRowColumn>
        <IconButton iconClassName="muidocs-icon-custom-github" />
      </TableRowColumn>
    </TableBody>
  }
  render() {
    return (
      <div className="wod-list">
        <div className="table-nav">
          <div className="inner-nav">
            <p className="week">{/*this.props.week*/}20-27 АВГУСТА</p>
            <p className="page-title"><b>WOD КАЛЕНДАРЬ</b></p>
          </div>
        </div>
        <Table 
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
              <TableHeaderColumn>Понедельник</TableHeaderColumn>
              <TableHeaderColumn>Вторник</TableHeaderColumn>
              <TableHeaderColumn>Среда</TableHeaderColumn>
              <TableHeaderColumn>Четверг</TableHeaderColumn>
              <TableHeaderColumn>Пятница</TableHeaderColumn>
              <TableHeaderColumn>Суббота</TableHeaderColumn>
              <TableHeaderColumn>Воскресенье</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.renderBody()} 
        </Table>
        { !this.props.isMobile && 
        <ScrollToTop showUnder={160}>
          <i className="material-icons to-top">&#xE5D8;</i>
        </ScrollToTop>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

const Wod = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Wod);

export default Wod
