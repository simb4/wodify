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
      full_name: this.props.user.full_name,
      phone: this.props.user.phone,
      email: this.props.user.username,
      showModal: false,
      avatar: this.props.user.avatar
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  applyImg(file) {

    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        avatar: file,
        avatarPreview: reader.result,
        showModal: false,
      });
    }
    reader.readAsDataURL(file)
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
    var user = this.props.user
    var avatar_url = this.state.avatarPreview;
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
            onChange={(e)=>{this.applyImg(e.target.files[0])}}
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
  getStatus(){
    return this.props.user.is_active ? "активен" : "неактивен"
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  handleChangeName = (event) => {
    this.setState({full_name: event.target.value})
  }
  handleChangeEmail = (event) => {
    this.setState({email: event.target.value})
  }
  handleChangeNumber = (event) => {
    this.setState({phone: event.target.value})
  }
  handleUpdate = () => {
    this.setState({save: false, update: false})
  }
  handleSubmit = () => {
    this.setState({update: true})
    let data = new FormData();
    data.append('avatar', this.state.avatar);
    data.append('phone', this.state.phone);
    data.append('full_name', this.state.full_name);
    this.props.updateProfile(data)
  }
  renderProfilePhoto(){
    var photo = this.state.avatarPreview || this.state.avatar || require('./ava.png');
    return (
      <div>
        {this.renderAvatarMenu()}
        <div className="avatar-container">
          <img
            src={photo}
            onClick={this.state.update ? ()=>{} : this.handleOpenModal}
            alt={this.props.user.full_name}
            className="avaPNG"
          />
        </div>
      </div>
    )
  }
  renderGymInfo() {
    return null;/*
      <div className="gym-info">
        <p>Статус: {this.getStatus()}</p><br/>
        <p>Зал: {this.props.user.gym.name}</p><br/>
        <p>Адрес зала: {this.props.user.gym.address}</p>
      </div>*/
  }
  render(){
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
                value={this.state.full_name}
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
  updateProfile: userActions.updateProfile,
  clearAthleteList: adminActions.clearAthleteList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Porfile);
