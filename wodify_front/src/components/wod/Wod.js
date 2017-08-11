import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from '../elements/Loader'
import { Link } from 'react-router-dom'

import CircularProgress from 'material-ui/CircularProgress'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'

import "./wod.css"
import ScrollToTop from 'react-scroll-up'
import {
  Table,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'


import * as actions from '../../actions/adminActions'

const styles={
  tableHeader: {
    color: "#007AFF"
  }
}

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
  render() {
    return (
      <div className="wod-list">
        <div className="table-nav">
          <div className="inner-nav">
            <p className="week">{/*this.props.week*/}20-26 АВГУСТА</p>
            <div className="add">
              <p className="page-title"><b>WOD КАЛЕНДАРЬ</b></p>
              <Link to="/admin/createwod">
                <FlatButton 
                  className="create-wod-btn" 
                  label="Добавить WOD" 
                  labelStyle={ styles.labelStyle }
                />
              </Link>
            </div>
          </div>
        </div>
        <Table  
          style={styles.tableHeader}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader 
            style={styles.tableHeader}
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow style={styles.tableHeader}>
              <TableHeaderColumn>Понедельник</TableHeaderColumn>
              <TableHeaderColumn>Вторник</TableHeaderColumn>
              <TableHeaderColumn>Среда</TableHeaderColumn>
              <TableHeaderColumn>Четверг</TableHeaderColumn>
              <TableHeaderColumn>Пятница</TableHeaderColumn>
              <TableHeaderColumn>Суббота</TableHeaderColumn>
              <TableHeaderColumn>Воскресенье</TableHeaderColumn>
            </TableRow>
          </TableHeader>
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
