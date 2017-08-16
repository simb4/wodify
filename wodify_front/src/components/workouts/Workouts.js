import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as action from '../../actions/adminActions'
import moment from 'moment';

class _Workouts extends Component {
  componentWillMount(){
    if(this.props.workouts.length === 0){
      let data = {
        date_of_workout: moment().format('YYYY-MM-DD')
      }
      this.props.getWorkouts(data)
    }
  }
  render(){
    return(
      <div>
        
      </div>
    )
  }
}

const mapStateToProps=(state) => ({
  workouts: state.admin.getWorkouts,
})

const mapDispatchToProps={
  getWorkouts: action.getWeeksWorkout,
}

const Workouts=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workouts);

export default Workouts