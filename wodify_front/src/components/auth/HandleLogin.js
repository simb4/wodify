import React, { Component } from 'react';
import { connect } from 'react-redux';

import VTextField from '../elements/VTextField';

import FlatButton from 'material-ui/FlatButton';

import {emailValidation, phoneValidation} from '../elements/Validator';

   // title: 'Добро пожаловать',
   //  subtitle: 'Введите ваш Email, пожалуйста',


class _HandleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: '',
    }
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({error: nextProps.errorMessage});
  }
  handleLoginChange(e){
    this.setState({username: e.target.value, error: ''});
  }
  handleEnter(target) {
    if(target.charCode === 13){
      this.handleSubmit();
    }
  }
  isOnlyDigits(val){
    return /^\d+$/.test(val) || val.charAt(0) === "+";
  }
  getFormat(username){
    if((username.charAt(0) !== '7' && username.charAt(0) !== '8') 
      || username.charAt(0) === "+")
      return username;
    return "+7"+username.substr(1, username.length);
  }
  handleSubmit(){
    let username = this.state.username;
    if(username.includes("@") || !this.isOnlyDigits(username)){
      if(!emailValidation(username)){
        this.setState({ error: "Неправильный email"});
        return;
      }
    }else {
      if(!phoneValidation(username)){
        this.setState({ error: 'Неправильный формат, пример: 87071234567'});
        return;
      }
      username = this.getFormat(username);
    }
    this.props.onSubmit({username: username});
  }
  render(){
    var isDisabled = this.props.isLoading || this.state.username === "";
    return (
      <div>
        <div className="auth-title">
            Добро пожаловать
          </div>
          <div className="auth-subtitle">
            Введите ваш Email, пожалуйста
          </div>
        <VTextField id="login"
          autoFocus
          fullWidth={true}
          name="username"
          floatingLabelText="Ваш номер телефона или email"
          value={this.state.username}
          onChange={this.handleLoginChange}
          onKeyPress={this.handleEnter}
          errorText={this.state.error}
        />
        <div className="auth-submit">
          <div>
          </div>
          <FlatButton className="next-btn"
            label="Далее"
            primary={true}
            onClick={this.handleSubmit}
            disabled={isDisabled} />
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoggingIn,
})

const mapDispatchToProps = {}

const HandleLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HandleLogin);

export default HandleLoginPage;
