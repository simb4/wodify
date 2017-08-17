import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as action from '../../actions/adminActions'
import moment from 'moment'

import './workouts.css'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

class _Workouts extends Component {

  constructor(props){
    super(props)
    this.state={
      fixedHeader: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      showCheckboxes: false,
      abonement: 1,
      status: 1,
    }
  }
  componentWillMount(){
    if(this.props.workouts.length === 0){
      let data = {
        date_of_workout: moment().format('YYYY-MM-DD')
      }
      this.props.getWorkouts(data)
    }
  }
  renderHeader(id){
    var wors = this.props.workouts
    if(wors.length !== 0){
      console.log(wors)
      let days = ["Понедельник", "Вторник", "Среда", "Четверг",
      "Пятница", "Суббота", "Воскресенье"]
      return wors.map((w) => {
        var date = w.date_of_workout
        var dd = date.substring(8,10)
        var mm = date.substring(5,7)
        return(
          <TableHeaderColumn key={w.day_id} style={{border: "1px solid #BCBBC1"}}>
            <p className="pre-header">{dd}/{mm}</p> 
            <p className="header">{days[w.day_id]}</p>
          </TableHeaderColumn> 
        )
      })
    }
  }
  renderBody(){
    var time = [1,2,3,4,5,6,7,8,20,9,10,11,12,13,14,15,16,17,18,19]
    return time.map((r)=>{
      return <TableRow key={r}>
        <TableRowColumn>
          1
        </TableRowColumn>
        <TableRowColumn>
          2
        </TableRowColumn>
        <TableRowColumn>
          3
        </TableRowColumn>
        <TableRowColumn>
          4
        </TableRowColumn>
        <TableRowColumn>
          5
        </TableRowColumn>
        <TableRowColumn>
          6
        </TableRowColumn>
        <TableRowColumn>
          7
        </TableRowColumn>
      </TableRow>
    })
  }
  render(){
    return(
      <div className="workout-wrapper">
        <Table 
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              {this.renderHeader()}
            </TableRow>
          </TableHeader>
          <TableBody 
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.renderBody()}
          </TableBody>  
        </Table>
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