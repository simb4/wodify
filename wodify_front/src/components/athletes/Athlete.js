import React, { Component } from 'react';
import { SERVER_URL } from '../../constants/server'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import Avatar from 'material-ui/Avatar';

class Athlete extends Component {

  renderAvatar(){
    var user = this.props.athlete;
    var avatar = ""
    if(typeof user !== "undefined"){
      if(user.avatar_url !== null){
        avatar = SERVER_URL + user.avatar_url
      } else {
        avatar = ""
      }
    } 
    return (
      <Avatar 
        className="ava"
        size={30}
        src={avatar} 
      />
    )
  }

  render(){
    return (
      <TableRow className="athletesMain">
        <TableRowColumn>
          <div className="name-ava">
            {/*this.renderAvatar()*/}
            {this.props.athlete.first_name + " " +
            this.props.athlete.last_name}
          </div>
        </TableRowColumn>
        <TableRowColumn>{this.props.athlete.username}</TableRowColumn>
        <TableRowColumn>{this.props.athlete.phone_number}</TableRowColumn>
      </TableRow>
    )
  }
}

export default Athlete