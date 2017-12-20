import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import {SERVER_URL } from '../../constants/server'

import * as authActions from '../../actions/authActions'

import './header.css';

const styles={
    labelStyle: {
      color: "#000000",
    },
    avatar: {
      margin: "0px",
      display: "inline"
    },
    ava_wrapper: {
      paddingTop: "40px",
      display: "inline"
    },
    profile: {
      height: "auto",
    },
    label: {
      textTransform: "initial"
    },
};

let headerHeight='60px';

class _Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  renderIconElementCenter(){
    if(this.props.isLoggedIn){
      return (
        <div>
          <Link to="/">
            <FlatButton 
              className="auth-btn" 
              label="WOD" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
          <Link to="/athletes">
            <FlatButton 
              className="auth-btn" 
              label="Атлеты" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
          <Link to="/workouts">
            <FlatButton 
              className="auth-btn" 
              label="Классы" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
        </div>
      )
    }
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  renderIconElementRight() {
    if(this.props.isLoggedIn){
      let user = this.props.user;

      let avatar = user.avatar;
      if(!avatar)
        avatar = require('./ava.png');

      return(
        <div className="hmenu"> 
          <FlatButton
            onClick={this.handleTouchTap}
            labelStyle={styles.label}
            hoverColor={"none"}
            rippleColor={"none"}
            style={styles.profile}
            label={user.full_name}
            labelPosition="before"
            icon={<Avatar 
                    size={40}
                    src={avatar} 
                    style={styles.avatar}
                  />}
          />
           <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              className="popover"
            >
              <Menu>
                <Link to="/profile" className="link">
                  <MenuItem primaryText={user.full_name} />
                </Link>
                <Link to="/addathlete" className="link">
                  <MenuItem 
                    primaryText="Добавить пользователя"
                  />
                </Link>
                <Link to="/login" className="link">
                  <MenuItem 
                    primaryText="Выйти" 
                    onClick={this.props.logout}/>
                </Link>
              </Menu>
            </Popover>
        </div>
      )
    }
    return (
      <div>
        <Link to="/login">
          <FlatButton 
            className="auth-btn" 
            label="войти" 
            labelStyle={ styles.labelStyle }
            />
        </Link>
      </div>
    )
  }

  render() {
    if(this.props.isMobile){
      headerHeight='64px';
    }
    return(
      <AppBar
        iconElementLeft={this.renderIconElementCenter()}
        iconElementRight={ this.renderIconElementRight() }
        style={{ 
          backgroundColor: '#fff', 
          height: headerHeight,
          display: "inline-flex", 
          alignItems: "center", 
        }}
        className="header"
      />
    )
  }
}

const mapStateToProps=(state) => ({
  user: state.user.user,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps={
  logout: authActions.logout,
}

const Header=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Header);

export default Header;
