import React, { Component } from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';

import Athlete from "./Athlete"
// import AthleteProfile from './AthleteProfile'

import ScrollToTop from 'react-scroll-up';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

import './athlete.css'


import * as actions from '../../actions/adminActions';

const styles = {
  header: {
    fontSize: "14px"
  }
}

class _AthleteList extends Component {
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
    }
  }
  componentWillMount() {
    this.props.clearFlags()
    const callBack = (ok) => {  // нужно дописать лоадинг
      if (ok) {

      } else {
        
      }
    }
    if (!this.props.athleteList.length) {
      this.props.getAthletes({ }, callBack);
    }
  }
  cellClicked = (row,column,event) => {
    console.log(row)
  }
  renderAthlete(athlete) {
    return (
      <Athlete
        key={athlete.id} 
        athlete={athlete} 
        isMobile={this.props.isMobile}
        user={this.props.user}
      />
    );
  }
  renderLoader(){
    if(this.props.isLoading){
      return  <CircularProgress size={80} thickness={5} />
    }
    return 
  }
  handleChangeAbonement = (event, index, abonement) => 
    this.setState({abonement});
  handleChangeStatus = (event, index, status) => 
    this.setState({status});

  render() {
    return (
      <div className="athlete-list">
        <div className="table-menu">
          <p className="page-title"><b>Атлеты</b></p>
        </div>
        {this.renderLoader()}
        <div className="filter">
          <Toolbar style={{justifyContent: "flex-start"}}>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu value={this.state.abonement} 
                onChange={this.handleChangeAbonement} 
                style={{minWidth: "200px", 
                        maxWidth: "300px" }}>
                  <MenuItem value={1} primaryText="Все абонементы" />
                  <MenuItem value={2} primaryText="Дневной" />
                  <MenuItem value={3} primaryText="Студенческий" />
                  <MenuItem value={4} primaryText="Детский" />
                  <MenuItem value={5} primaryText="Безлимит" />
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu value={this.state.status} 
                onChange={this.handleChangeStatus}>
                  <MenuItem value={1} primaryText="Все атлеты" />
                  <MenuItem value={2} 
                    primaryText="Активные атлеты" />
                  <MenuItem value={3} 
                    primaryText="Неактивные атлеты" />
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>
        </div>
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
              <TableHeaderColumn style={styles.header}>
                Имя
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.header}>
                Почта
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.header}>
                Номер телефона
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody 
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.athleteList.map((athlete) => 
              this.renderAthlete(athlete)) }
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
  gettingAthletes: state.admin.isGettingAthletes,
  user: state.user.user
})

const mapDispatchToProps = {
  getAthletes: actions.getAthletes,
  clearFlags: actions.clearFlags
}

const AthleteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AthleteList);

export default AthleteList
