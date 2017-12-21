import React, { Component } from 'react'
import { connect } from 'react-redux'

// import * as workActions from '../../actions/workoutActions'
// import moment from 'moment'

import { TIME } from '../../constants/schedule'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

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

    }
  }
  renderHours(){
    return TIME.map((t) => {
      return (
        <TableRow key={t}>
          <TableRowColumn >{t}</TableRowColumn>
        </TableRow>
      )
    })
  }

  render(){
    return(
      <div className="workout-wrapper">
        <p className="page-title">Классы</p>
        <RadioButtonGroup 
          name="current" 
          defaultSelected={0}
          onChange={this.changeWorkout}>
          <RadioButton
            value={0}
            label="Текущая неделя"
          />
          <RadioButton
            value={1}
            label="Все недели"
          />
        </RadioButtonGroup><br/>
        <div className="tables">
          <div className="workout-hours">
            <Table 
              fixedHeader={false}
              selectable={false}
              multiSelectable={false}
              style={{backgroundColor: "whitesmoke", border: "none"}}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
                style={{border: "none"}}
              >
                <TableRow 
                  style={{border: "none", height: "24px"}}
                >
                  <TableHeaderColumn 
                    style={{border: "none", height: "64px"}}
                  >
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody 
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
                style={{border: "none", height: "40px"}}
                >
                  {this.renderHours()}
                  </TableBody>
            </Table>
          </div>
          <div className="workout-table">
            <Table 
              style={{cursor: "pointer"}}
              onCellClick={this.cellClicked}
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
                </TableRow>
              </TableHeader>
              <TableBody 
                displayRowCheckbox={this.state.showCheckboxes}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
              </TableBody> 
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state) => ({

})

const mapDispatchToProps={

}

const Workouts=connect(
  mapStateToProps,
  mapDispatchToProps
)(_Workouts);

export default Workouts