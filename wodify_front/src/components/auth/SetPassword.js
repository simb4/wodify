import React, { Component } from 'react';
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/LinearProgress';
import VTextField from '../elements/VTextField';
import FlatButton from 'material-ui/FlatButton';

import * as actions from "../../actions/authActions"


class _SetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: "",
      confirm: "",
      error: ""
    }
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value, error: ''});
  }
  handleConfirmChange(e) {
    this.setState({confirm: e.target.value, error: ''});
  }
  handleSubmit(){
    if(this.state.password.length > 5 && 
      this.state.password === this.state.confirm){
        let data = {
          token: "157uetRaWDkqJFaKzhW79mV3gwyTTMJAo",
          new_password: this.state.password
        }
        this.props.setPassword(data)
    } else {
      alert("Пароли не совпадают")
    }
    
  }
  renderProgress(){
    if(this.props.isLoading)
      return <LinearProgress mode="indeterminate" 
        className="linearProgress"/>
    return null;
  }
  render(){
    return (  
      <div className="content-auth">
        <div className="auth-cart">
          <div className="auth-logo">
          </div>
          <div className="auth-body">
            <div>
              <div className="auth-title">
                  Установление нового пароля
                </div>
                <VTextField
                  autoFocus
                  fullWidth={true}
                  floatingLabelText="Введите новый пароль"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind(this)}
                  type="password"
                  // onKeyPress={this.handleEnter.bind(this)}
                  errorText={this.state.error}
                />
                <VTextField
                  autoFocus
                  fullWidth={true}
                  floatingLabelText="Подтвердите пароль"
                  value={this.state.confirm}
                  onChange={this.handleConfirmChange.bind(this)}
                  type="password"
                  // onKeyPress={this.handleEnter.bind(this)}
                  errorText={this.state.error}
                />
              <div className="auth-submit">
                <div>
                </div>
                <FlatButton className="next-btn"
                  label="Установить пароль"
                  primary={true}
                  onClick={this.handleSubmit.bind(this)}
                  />
              </div>
            </div>
          </div>
        </div>
        {this.renderProgress()}
      </div>
    )  
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isPasswordSetting,
  set: state.auth.isPasswordSet
})

const mapDispatchToProps = {
  setPassword: actions.setPassword
};

const SetPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SetPassword);

export default SetPasswordPage;





