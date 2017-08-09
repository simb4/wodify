import React, { Component } from 'react';
import { connect } from 'react-redux';

class Athlete extends Component {
  render(){
    return (
      <div>
          <th>{this.props.athlete.first_name}</th>
          <th>{this.props.athlete.last_name}</th>
      </div>
    )
  }
}

export default Athlete