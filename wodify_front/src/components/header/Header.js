import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'

import * as authActions from '../../actions/authActions'

import './header.css';

const styles={
    labelStyle: {
      color: "#000000",
    },
};

class _Header extends Component {

  renderIconElementCenter(){
    if(this.props.isLoggedIn){
      return (
        <div>
          <Link to="/admin/wod">
            <FlatButton 
              className="auth-btn" 
              label="WOD" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
          <Link to="/admin/athletes">
            <FlatButton 
              className="auth-btn" 
              label="Атлеты" 
              labelStyle={ styles.labelStyle }
            />
          </Link>
          <Link to="/admin">
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

  renderIconElementRight() {
    if(this.props.isLoggedIn)
      return(
        <div className="hmenu"> 
          <Link to="/login">
            <FlatButton 
              className="auth-btn" 
              label="выйти" 
              labelStyle={ styles.labelStyle }
              onClick={this.props.logout}
            />
          </Link>
        </div>
      )
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
    let headerHeight='60px';
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
