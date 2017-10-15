import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as adminActions from "../../actions/adminActions"

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import {emailValidation} from '../elements/Validator';
import * as constants from '../../constants/constants'

const styles = {
  customWidth: {
    width: 150,
  },
  sendBtn: {
  }
};

var admin, id

class _NewAthlete extends Component {
  constructor(props){
    super(props)
    this.state={
      username:"",
      password: "",
      errorText: "",
      errorPass: "",
      errorName: "",
      errorSurname: "",
      name: "",
      surname: "",
      value: 1,
      isValidPassword: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = 
      this.handleChangePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnter=this.handleEnter.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeSurname=this.handleChangeSurname.bind(this)
  }

  componentWillMount(){

    if(!admin){
      admin = localStorage.getItem('state')
      admin = JSON.parse(admin)
      id = admin.user.user.administrator.gym.id
    }

  }

  componentWillReceiveProps(nextProps){
 
    if(nextProps.errorMessage !== 
        constants.ERRORS.ACCOUNT_NOT_FOUND){
      this.setState({errorText: nextProps.errorMessage});
    }
 
    if(nextProps.isLoginExist){
      this.setState({errorText: 
          constants.ERRORS.ACCOUNT_ALREADY_EXISTS});
    }

    if(nextProps.isAccountNotExist && !nextProps.isLoading && 
      !nextProps.isRegistered && this.state.isValidPassword){
        let data = {
          username: this.state.username, 
          password: this.state.password, 
          user_type: this.state.value,
          first_name: this.state.name,
          last_name: this.state.surname,
          gym_id: id,
        }
        this.props.register(data)
    }
  }
  
  handleChange = (event, index, value) => this.setState({value})
  handleChangeName(e){
    var n = e.target.value
    this.setState({
      name: n,
    })
  }
  handleChangeSurname(e){
    var s = e.target.value
    this.setState({
      surname: s,
    })
  }
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

    if(this.state.name === ""){
      this.setState({errorName: "Введите имя пользователя"})
      return
    }

    if(this.state.surname === ""){
      this.setState({errorSurname: "Введите фамилию пользователя"})
      return
    }

    let username = this.state.username
    if(username.includes("@")){
      if(!emailValidation(username)){
        this.setState({ errorText: "Неправильный email"});
        return;
      } 
      else {
        if(!this.props.isAccountNotExist){
          this.setState({errorText: 
            constants.ERRORS.ACCOUNT_ALREADY_EXISTS})
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
      this.setState({
        errorPass: "Длина пароля должна быть более 6 символов",
        isValidPassword: false,
      })
      return 
    }
    this.setState({
      errorPass: "",
      isValidPassword: true
    })
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
    if(this.state.username !== "" && 
      this.state.password !== ""){
      isDisabled = false
    }
    return(
      <div className="box-wrapper">
        <div className="registration-wrapper box">
          <h2 className="box-title">Добавить пользователя</h2>
          <div className="box-fields-athlete">
            <TextField
              style={{width: "300px", textAlign: "left"}}
              hintText="Имя"
              errorText={this.state.errorName}
              onChange={this.handleChangeName}
              value={this.state.name}
              onKeyPress={this.handleEnter}
            /><br/>
            <TextField
              style={{width: "300px", textAlign: "left"}}
              hintText="Фамилия"
              errorText={this.state.errorSurname}
              onChange={this.handleChangeSurname}
              value={this.state.surname}
              onKeyPress={this.handleEnter}
            /><br/>
            <TextField
              style={{width: "300px", textAlign: "left"}}
              hintText="Email"
              errorText={this.state.errorText}
              onChange={this.handleChangeEmail}
              value={this.state.username}
              onKeyPress={this.handleEnter}
            /><br/>
            <TextField
              style={{width: "300px"}}
              hintText="Password"
              errorText={this.state.errorPass}
              onChange={this.handleChangePassword}
              value={this.state.password}
              onKeyPress={this.handleEnter}
              type="password"
            /><br/>
            <SelectField
              style={{width: "300px"}}
              floatingLabelText="Роль"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            >
              <MenuItem value={2} primaryText="Атлет" />
              <MenuItem value={1} primaryText="Тренер" />
              <MenuItem value={0} primaryText="Администратор" />
            </SelectField><br/>
          </div>
          <RaisedButton 
            label="Создать атлета" 
            style={styles.sendBtn}
            onClick={this.handleSubmit}
            disabled={isDisabled} 
            className="create-btn-athlete"

          /><br/>
          {this.renderLoader()}
          {this.redirectToMain()}
        </div>
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

