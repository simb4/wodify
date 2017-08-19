import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import * as userActions from '../../actions/userActions';
import * as adminActions from '../../actions/adminActions';

import { SERVER_URL } from "../../constants/server"
import "./admin.css"

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


class _AdminMainPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      save: true,
      update: true,
      name: this.getUser().first_name,
      surname: this.getUser().last_name,
      birth: this.getUser().date_of_birth,
      phone: this.getUser().phone_number,
      email: this.getUser().username,
      city:  this.getUser().gym.city.name,
    }
  }
  getUser(){
    var user = this.props.user
    if(user.athlete !== null){
      user = user.athlete
    } else if(user.coach !== null){
      user = user.coach
    } else {
      user = user.administrator
    }

    return user
  }
  getStatus(){
    return this.getUser().is_active ? "активен" : "неактивен"
  }
  renderProfilePhoto(){
    var user = this.getUser()
    var photo = ""
    console.log(user)
    if(user.avatar_url !== null){
      photo = SERVER_URL + user.avatar_url
    } else {
      photo = ""
    }
    return (
      <div className="change-ava">
        <img src={photo} alt="avatar" className="photo"/>

      </div>
    )
  }

  handleChangeName = (event) => {
    this.setState({name: event.target.value})
  }
  handleChangeSurname = (event) => {
    this.setState({surname: event.target.value})
  }
  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
  }
  handleChangeNumber = (event) => {
    this.setState({phone: event.target.value})
  }
  handleChangeCity = (event) => {
    this.setState({city: event.target.value})
  }
  handleChangeDateOfBirth = (event) => {
    this.setState({birth: event.target.value})
  }
  handleUpdate = () => {
    this.setState({save: false, update: false})
  }
  handleSubmit = () => {
    let data = {
      first_name: this.state.name,
      last_name: this.state.surname,
      phone_number: this.state.phone,
      gym_id: this.getUser(),
      gender: this.getUser().gender,
      city_id: this.getUser(),
      date_of_birth: this.state.birth,
      avatar: this.getUser().avatar_url
    }

    this.props.updateProfile(data)
    this.props.clearAthleteList()

  }
  render(){
    return(
      <div className="profile-wrapper">
        <p className="page-title">Мой профиль</p>
        <div className="profile-box">
          <div className="profile-photo">
            {this.renderProfilePhoto()}
            <div className="gym-info">
              <p>Статус: {this.getStatus()}</p><br/>
              <p>Зал: {this.getUser().gym.name}</p><br/>
              <p>Адрес зала: {this.getUser().gym.address}</p>
            </div>
          </div>
          <div className="profile-info">
            <TextField
                value={this.state.name}
                disabled={this.state.update}
                floatingLabelText="Имя"
                fullWidth={false}
                onChange={this.handleChangeName.bind(this)}
            /><span className="white-space"> </span>
            <TextField
                value={this.state.surname}
                disabled={this.state.update}
                floatingLabelText="Фамилия"
                fullWidth={false}
                onChange={this.handleChangeSurname.bind(this)}
            /><br/>
            <TextField
                value={this.state.email}
                disabled={this.state.update}
                floatingLabelText="Почта"
                fullWidth={false}
                onChange={this.handleChangeEmail.bind(this)}
            /><span className="white-space"> </span>
            <TextField
                value={this.state.phone}
                disabled={this.state.update}
                floatingLabelText="Номер телефона"
                fullWidth={false}
                onChange={this.handleChangeNumber.bind(this)}
            /><br/>
            <TextField
                value={this.state.city}
                disabled={this.state.update}
                floatingLabelText="Город"
                fullWidth={false}
                onChange={this.handleChangeCity.bind(this)}
            /><span className="white-space"> </span>
            <TextField
                value={this.state.birth}
                disabled={this.state.update}
                floatingLabelText="День рождения"
                fullWidth={false}
                onChange={this.handleChangeDateOfBirth.bind(this)}
            /><br/>
          </div>
          <FlatButton 
              label="Изменить" 
              onClick={this.handleUpdate.bind(this)}
              className="create-btn-athlete"
          />
          <FlatButton 
              label="Сохранить" 
              onClick={this.handleSubmit.bind(this)}
              disabled={this.state.save} 
              className="create-btn-athlete"
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state) => ({
  user: state.user.user,
  isLoading: state.user.isProfileUpdating
})

const mapDispatchToProps={
  updateProfile: userActions.updatingProfile,
  clearAthleteList: adminActions.clearAthleteList
}

const AdminMainPage=connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminMainPage);


export default AdminMainPage;