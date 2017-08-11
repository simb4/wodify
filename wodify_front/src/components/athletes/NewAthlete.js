import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as authActions from "../../actions/authActions"
import * as adminActions from "../../actions/adminActions"

import IconButton from 'material-ui/IconButton';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import {emailValidation, phoneValidation} from '../elements/Validator';
import * as constants from '../../constants/constants'

const styles = {
  customWidth: {
    width: 150,
  },
  sendBtn: {
  }
};

class _NewAthlete extends Component {
  constructor(props){
    super(props)
    this.state={
      username:"",
      password: "",
      errorText: "",
      errorPass: "",
      value: 1,
      isValidPassword: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnter=this.handleEnter.bind(this)
  }

  componentWillReceiveProps(nextProps){

    // if(nextProps.isLoading)
    //   return;

 
    if(nextProps.errorMessage !== constants.ERRORS.ACCOUNT_NOT_FOUND){
      this.setState({errorText: nextProps.errorMessage});
    }
 
    if(nextProps.isLoginExist){
      this.setState({errorText: constants.ERRORS.ACCOUNT_ALREADY_EXISTS});
    }
 

    if(nextProps.isAccountNotExist && !nextProps.isLoading && 
      !nextProps.isRegistered && this.state.isValidPassword){
        let data = {
          username: this.state.username, 
          password: this.state.password, 
          user_type: this.state.value
        }
        this.props.register(data)
    }
  }
  
  handleChange = (event, index, value) => this.setState({value})
  handleChangeEmail(e){
    var email = e.target.value
    this.setState({
      username: email,
    })
  }
  handleChangePassword(e){
    var pwd = e.target.value
    this.setState({
      password: pwd,
    })
  }
  handleSubmit(){
    let username = this.state.username
    if(username.includes("@")){
      if(!emailValidation(username)){
        this.setState({ errorText: "Неправильный email"});
        return;
      } 
      else {
        if(!this.props.isAccountNotExist){
          this.setState({errorText: constants.ERRORS.ACCOUNT_ALREADY_EXISTS})
        } else {
          this.setState({ errorText: ""});
        }
      }
    } else {
      this.setState({ errorText: "Неправильный email" });
        return;
    }
    this.props.checkLogin({username: this.state.username})

    let p = this.state.password
    if(p.length < 6){
      this.state.errorPass = "Длина пароля должна быть более 6 символов"
      this.state.isValidPassword = false
      return 
    }
    this.state.errorPass = ""
    this.state.isValidPassword = true
  }

  handleEnter(target) {
    if(target.charCode === 13){
      this.handleSubmit();
    }
  }
  renderLoader(){
    if(this.props.isLoading){
      return  <CircularProgress size={80} thickness={5} />
    }
    return null;
  }
  redirectToMain() {
    if(this.props.isRegistered){
      return  <Redirect to={{
                pathname: '/admin/athletes',
                from: '/admin/newathlete'}}/>
    }
  }
  render(){
    var isDisabled = true
    if(this.state.username !== "" && this.state.password !== ""){
      isDisabled = false
    }
    return(
      <div className="registration-wrapper">
        <TextField
          hintText="Email"
          errorText={this.state.errorText}
          onChange={this.handleChangeEmail}
          value={this.state.username}
          onKeyPress={this.handleEnter}
        /><br/>
        <TextField
          hintText="Password"
          errorText={this.state.errorPass}
          onChange={this.handleChangePassword}
          value={this.state.password}
          onKeyPress={this.handleEnter}
        /><br/>
        <SelectField
          floatingLabelText="Frequency"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        >
          <MenuItem value={1} primaryText="Атлет" />
          <MenuItem value={2} primaryText="Тренер" />
          <MenuItem value={0} primaryText="Администратор" />
        </SelectField><br/>
        <RaisedButton 
          label="Создать атлета" 
          style={styles.sendBtn}
          onClick={this.handleSubmit}
          disabled={isDisabled} 
        /><br/>
        {this.renderLoader()}
        {this.redirectToMain()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAccountNotExist: state.admin.isRegisteringLoginExist,
  isLoading: state.admin.isRegistering,
  errorMessage: state.auth.errorMessage,
  isRegistered: state.admin.isRegistered
})

const mapDispatchToProps = {
  checkLogin: adminActions.checkAccount,
  register: adminActions.registerUser,
}

const NewAthlete = connect(
  mapStateToProps,
  mapDispatchToProps
)(_NewAthlete)

export default NewAthlete

