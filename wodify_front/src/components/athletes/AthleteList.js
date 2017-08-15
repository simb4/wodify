import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} 
  from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';

import Athlete from "./Athlete"

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
  handleChange = (event, index, value) => this.setState({value});
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
      value: 3,
    }
  }
  render() {
    return (
      <div className="athlete-list">
        <div className="table-menu">
          <p className="page-title"><b>Атлеты</b></p>
          <Link to="/admin/addathlete">
            <FlatButton 
              label="добавить атлета"
            />
          </Link>
        </div>
        {this.renderLoader()}
        <div className="filter">
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Все атлеты" />
                <MenuItem value={2} primaryText="All Voice" />
                <MenuItem value={3} primaryText="All Text" />
                <MenuItem value={4} primaryText="Complete Voice" />
                <MenuItem value={5} primaryText="Complete Text" />
                <MenuItem value={6} primaryText="Active Voice" />
                <MenuItem value={7} primaryText="Active Text" />
              </DropDownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarTitle text="Options" />
              <FontIcon className="muidocs-icon-custom-sort" />
              <ToolbarSeparator />
              <RaisedButton label="Create Broadcast" primary={true} />
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem primaryText="Download" />
                <MenuItem primaryText="More Info" />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
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
