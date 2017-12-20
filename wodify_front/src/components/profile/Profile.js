import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash';
import * as userActions from '../../actions/userActions';
import * as adminActions from '../../actions/adminActions';

import { SERVER_URL } from "../../constants/server"
import "./profile.css"

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { toFormData } from '../../constants/transform.js'

class Porfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      save: true,
      update: true,
      name: this.getUser().full_name,
      phone: this.getUser().phone,
      email: this.getUser().username,
      showModal: false,
      avatar: this.getUser().avatar_url
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  renderAvatarMenu() {
    let styles = {
      modal: false,
      open: this.state.showModal,
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      onRequestClose: this.handleCloseModal,
      contentStyle: {
        // width: this.props.isMobile ? '100%' : '480px',
        transform: 'translate(0, 0)',
        left: 10,
        right: 10
      },
      bodyStyle: { height: '100%', right: '20px', padding: 0},
      style: {
        paddingTop: 0,
        position: 'fixed',
        overflowY: 'scroll',
        paddingRight: '20px',
      },
    }
    let buttonStyle = {
      boxShadow: "none",
      borderBottom: "1px solid",
      borderColor: "rgb(224, 224, 224)"
    }
    var user = this.getUser()
    var avatar_url = null
    if(user.avatar_url !== null){
      avatar_url = SERVER_URL + user.avatar_url
    } else {
      avatar_url = ""
    }
    return (
      <Dialog {...styles} >
        <RaisedButton
          containerElement='label'
          label="ФОТО ПРОФИЛЯ"
          fullWidth={true}
          style={buttonStyle}
          disabled={true}>
        </RaisedButton>
        <RaisedButton
          containerElement='label'
          label={avatar_url ? "Сменить аватар" : "Загрузить аватар"}
          fullWidth={true}
          style={buttonStyle}>
          <input
            type="file"
            onChange={(e)=>this.handleAvatarChange(e)}
            style={{ display: 'none' }} />
        </RaisedButton>
        {avatar_url &&
          <RaisedButton
            containerElement='label'
            label="Удалить аватар"
            fullWidth={true}
            style={buttonStyle}
            onClick={this.handleAvatarDelete}
          >
          </RaisedButton>
        }
        <RaisedButton
          containerElement='label'
          label="Отмена"
          fullWidth={true}
          style={{ boxShadow: "none" }}
          onClick={this.handleCloseModal}>
        </RaisedButton>
      </Dialog>
      )
  }

  getUser(){
    return this.props.user
  }
  getStatus(){
    return this.getUser().is_active ? "активен" : "неактивен"
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  renderProfilePhoto(){
    var user = this.getUser()
    var photo;
    if(user.avatar_url){
      photo = SERVER_URL + user.avatar_url
    } else {
      photo = require('./ava.png');
    }
    return (
      <div>
        {console.log(photo)}
        {this.renderAvatarMenu()}
        <div className="avatar-container">
          <img
            src={photo}
            onClick={this.handleOpenModal}
            alt={this.props.user.first_name}
            className="avaPNG"
            // onLoad={this.handleAvatarLoad}
            // width={(width>=height)?'auto':(this.props.isMobile?94:144)}
            // height={(width>=height)?(this.props.isMobile?94:144):'auto'}
          />
        </div>
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
    this.setState({update: true})
    let data = {
      first_name: this.state.name,
      last_name: this.state.surname,
      phone: this.state.phone,
      gym_id: this.getUser().gym.id,
      gender: this.getUser().gender,
      city_id: this.getUser().gym.city.id,
      avatar_url: this.getUser().avatar_url,
      date_of_birth: this.state.birth
    }

    this.props.updateProfile(data)
    this.props.clearAthleteList()

  }
  renderGymInfo() {
    return null;/*
      <div className="gym-info">
        <p>Статус: {this.getStatus()}</p><br/>
        <p>Зал: {this.getUser().gym.name}</p><br/>
        <p>Адрес зала: {this.getUser().gym.address}</p>
      </div>*/
  }
  render(){
    console.log(this.props.user);
    return(
      <div className="profile-wrapper">
        <p className="page-title">Мой профиль</p>
        <div className="profile-box">
          <div className="profile-photo">
            {this.renderProfilePhoto()}
            {this.renderGymInfo()}
          </div>
          <div className="profile-info">
            <TextField
                value={this.state.name}
                disabled={this.state.update}
                floatingLabelText="Имя"
                fullWidth={true}
                onChange={this.handleChangeName.bind(this)}
            />
            <TextField
                value={this.state.email}
                disabled={this.state.update}
                floatingLabelText="Почта"
                fullWidth={true}
                onChange={this.handleChangeEmail.bind(this)}
            />
            <TextField
                value={this.state.phone}
                disabled={this.state.update}
                floatingLabelText="Номер телефона"
                fullWidth={true}
                onChange={this.handleChangeNumber.bind(this)}
            />
          </div>
          <div className="buttons">
            <FlatButton 
              label="Изменить" 
              onClick={this.handleUpdate.bind(this)}  
              className="change-btn"
            />
            <FlatButton 
              label="Сохранить" 
              onClick={this.handleSubmit.bind(this)}
              disabled={this.state.save} 
              className="save-btn"
            />
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Porfile);
