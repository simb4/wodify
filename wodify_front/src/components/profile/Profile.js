import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from "../../actions/authActions";
import _ from 'lodash';


class _Profile extends Component{
	render(){
		return(
			<button onClick={this.props.logout}>
			 Выйти
			</button>
		)
	}
}


const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  logout: authActions.logout
};

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Profile);

export default Profile;