import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import * as constants from "../constants/constants";

import Login from '../components/auth/Login';
import Header from '../components/header/Header'
import Profile from '../components/profile/Profile';
import HomePage from '../components/home/HomePage';
import AdminMainPage from "../components/admin/AdminMain"
import AthleteList from "../components/athletes/AthleteList"

import NoMatch from './NoMatch';

class _Main extends Component {
  render() {
    let isLoggedIn = { isLoggedIn: this.props.isLoggedIn };
    return (
      <Router>
        <Switch>
          <AuthRoute path="/login" component={Login} {...isLoggedIn}/>
          <UserRoute exact path="/admin" component={AthleteList} {...isLoggedIn}/>
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
  let { component: Component, isLoggedIn, ...rest } = props;
  return (
    <HeaderRoute {...rest} component={props => (
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={props.location.from ? props.location.from : "/admin"}/>
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
          pathname: '/',
          from: props.location.pathname,
        }}/>
      )
  )} />
)}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
};

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Main);

export default MainPage;
