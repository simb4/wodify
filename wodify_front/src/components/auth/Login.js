import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'

import HandleLogin from './HandleLogin';
import Password from './HandlePassword';

import LinearProgress from 'material-ui/LinearProgress';

import '../../styles/Styles.css';
import './Auth.css';

import * as actions from "../../actions/authActions";

const STEP_AUTH_LOGIN = 1;
const STEP_AUTH_PASSWORD = 2;
const STEP_RESET_BY_USERNAME = 3;
const STEPS = [
  { 
    id: 0,
  },
  {
    id: STEP_AUTH_LOGIN,
  },
  {
    id: STEP_AUTH_PASSWORD,
  },
  {
    id: STEP_RESET_BY_USERNAME,
    title: 'Восстановление пароля',
    subtitle: '',
  },
];
class Login extends Component {
  constructor(props) {
    super(props);
    let token = "";
    let step_id = STEP_AUTH_LOGIN;
    this.state = {
      username: '',
      password: '',
      step_id: step_id,
      backClick: false,
      token: token,
    }
    this.handleBack = this.handleBack.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (this.state.step_id === STEP_AUTH_LOGIN && nextProps.isLoginExist 
        && !this.state.backClick) {
      this.setState({ step_id: STEP_AUTH_PASSWORD });
    }
  }
  handleBack(){
    let s = this.state.step_id - 1;
    if(s === STEP_AUTH_LOGIN){
      this.setState({backClick: true});
    }
    this.setState({step_id: s});
  }
  handleLogin(newData){
    this.setState({username: newData.username, backClick: false});
    let data = { username: newData.username };
    this.props.checkLogin(data);
  }
  handlePassword(newData){
    let data = {
      username: this.state.username,
      password: newData.password
    };
    this.props.onLoginClick(data);
  }
  renderProgress(){
    if(this.props.isLoading)
      return <LinearProgress mode="indeterminate" className="linearProgress"/>
    return null;
  }
  renderBody() {
    let step_id = this.state.step_id;
    if(step_id === STEP_AUTH_LOGIN)
      return <HandleLogin onSubmit={this.handleLogin}
              data={{username: this.state.username}}/>
    if(step_id === STEP_AUTH_PASSWORD)
      return <Password onSubmit={this.handlePassword}
              onBackClick={this.handleBack} onResetClick={this.handleResetUser}
              data={{password: this.state.password}}/>
  }
  
  render() {
    let step_id = this.state.step_id;
    return (
      <div className="content-auth">
        <div className="auth-cart">
          <div className="auth-logo">
          </div>
          <div className="auth-body">
            {this.renderBody()}
          </div>
        </div>
        {this.renderProgress()}
      </div>
    )  
  }
}

const mapStateToProps = (state) => ({
  isLoginExist: state.auth.isLoginExist,
  isLoading: state.auth.isLoggingIn,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onLoginClick: actions.login,
  checkLogin: actions.checkLogin,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
