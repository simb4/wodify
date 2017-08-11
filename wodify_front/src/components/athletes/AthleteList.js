import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../elements/Loader';
import { Link } from 'react-router-dom'

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton'

import Athlete from "./Athlete"

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

import './athlete.css'


import * as actions from '../../actions/adminActions';

class _AthleteList extends Component {
  componentWillMount() {
    const callBack = (ok) => {  // нужно дописать лоадинг
      if (ok) {

      } else {
        
      }
    }
    if (!this.props.athleteList.length) {
      this.props.getAthletes({ }, callBack);
    }
  }
  renderAthlete(athlete) {
    return (
      <Athlete key={athlete.id} athlete={athlete} isMobile={this.props.isMobile}/>
    );
  }
  renderLoader(){
    console.log(this.props.athleteList)
    console.log('loading')
    if(this.props.isLoading){
      return  <CircularProgress size={80} thickness={5} />
    }
    return 
  }
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
      <div className="athlete-list">
        <div className="table-menu">
          <Link to="/admin/addathlete">
            <FlatButton 
              label="добавить атлета"
            />
          </Link>
        </div>
        {this.renderLoader()}
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
              <TableHeaderColumn>Имя</TableHeaderColumn>
              <TableHeaderColumn>Почта</TableHeaderColumn>
              <TableHeaderColumn>Номер телефона</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody 
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            { this.props.athleteList.map((athlete) => this.renderAthlete(athlete)) }
          </TableBody>  
        </Table>
        { !this.props.isMobile && 
        <ScrollToTop showUnder={160}>
          <i className="material-icons to-top">&#xE5D8;</i>
        </ScrollToTop>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  athleteList: state.admin.athleteList,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.admin.isGettingAthletes,
  gettingAthletes: state.admin.isGettingAthletes
})

const mapDispatchToProps = {
  getAthletes: actions.getAthletes
}

const AthleteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AthleteList);

export default AthleteList
