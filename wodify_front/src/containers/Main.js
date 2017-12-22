import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } 
  from 'react-router-dom';
import MediaQuery from 'react-responsive';

import * as constants from "../constants/constants";

import Login from '../components/auth/Login';
import Header from '../components/header/Header'
import Profile from '../components/profile/Profile';
// import HomePage from '../components/home/HomePage';
import AthleteList from "../components/athletes/AthleteList"
import AthleteProfile from "../components/athletes/AthleteProfile"
import NewAthlete from "../components/athletes/NewAthlete"
import Wod from "../components/wod/Wod"
import CreateWod from "../components/wod/CreateWod"
import AddSection from "../components/wod/AddSections"
import Constructor from "../components/wod/Constructor"
import EditWod from "../components/wod/EditWod"
import Workouts from '../components/workouts/Workouts'
import SetPassword from '../components/auth/SetPassword'

import NoMatch from './NoMatch';

class _Main extends Component {
  render() {
    let isLoggedIn = { isLoggedIn: this.props.isLoggedIn };
    return (
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Login} 
            {...isLoggedIn}/>
          <AuthRoute path="/main/reset" component={SetPassword} 
            {...isLoggedIn}/>

          <UserRoute exact path="/profile" 
            component={Profile} {...isLoggedIn}/>
          <UserRoute exact path="/" component={Wod} 
            {...isLoggedIn}/>

          <UserRoute exact path="/athletes" 
            component={AthleteList} {...isLoggedIn}/>
          <UserRoute exact path="/athletes/profile" 
            component={AthleteProfile} {...isLoggedIn}/>
          <UserRoute exact path="/addathlete" 
            component={NewAthlete} {...isLoggedIn}/>

          <UserRoute exact path="/createwod" 
            component={CreateWod} {...isLoggedIn}/>
          <UserRoute exact path="/createwod/add_sections" 
            component={AddSection} {...isLoggedIn}/>
          <UserRoute exact path="/createwod/constructor" 
            component={Constructor} {...isLoggedIn}/>
          <UserRoute exact path="/createwod/editwod" 
            component={EditWod} {...isLoggedIn}/>
          <UserRoute exact path="/workouts" 
            component={Workouts} {...isLoggedIn}/>

          <HeaderRoute name="not-found" component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}

export const HeaderRoute = (props) => {
  let { component: Component, ...rest } = props;
  return (
    <MediaQuery maxDeviceWidth={constants.MOBILE_MAX_WIDTH} >
      {(match) => {
        return (
          <Route {...rest} component={props => (
            <div className="main-wrapper">
              <Header {...props} isMobile={match} />
              <Component {...props} isMobile={match} />
            </div>

          )} />
        )
      }}
    </MediaQuery>
  )
}

export const AuthRoute = (props) => {
  let { component: Component, isLoggedIn, ...rest, } = props;
  return (
    <HeaderRoute {...rest} component={props => (
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={props.location.from ? 
          props.location.from : "/"}/>
      )
  )} />
)}

export const UserRoute = (props) => {
  let { component: Component, isLoggedIn, ...rest } = props;
  return (
    <HeaderRoute {...rest} component={props => (
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          from: props.location.pathname,
        }}/>
      )
  )} />
)}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {}

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Main);

export default MainPage;
