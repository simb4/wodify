import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../elements/Loader';

import Athlete from "./Athlete"

import ScrollToTop from 'react-scroll-up';
import Waypoint from 'react-waypoint';


import * as actions from '../../actions/adminActions';

class _AthleteList extends Component {
  componentWillMount() {
    const callBack = (ok) => {
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

  // {this.props.getAthletes()} ???

  render() {

    return (
      <div className="athlete-list">
        <table>
          { this.props.athleteList.map((athlete) => this.renderAthlete(athlete)) }
          
        </table>
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
  isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = {
  getAthletes: actions.getAthletes
}

const AthleteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AthleteList);

export default AthleteList
