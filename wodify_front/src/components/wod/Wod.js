import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from "../elements/Loader"

import FlatButton from 'material-ui/FlatButton'

import "./wod.css"
import ScrollToTop from 'react-scroll-up'
import {
  Table,
  TableHeader,
  TableBody,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import * as actions from '../../actions/adminActions'

const styles={
  TableHeaderColumn: {
    color: "#007AFF",
    height: "22px",
    fontSize: "14px",
    textAlign: "center"
  },
  TableRow:{
    height: "22px"
  }
}

class _Wod extends Component {
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
    }
    this.renderWods = this.renderWods.bind(this)
  }
  componentWillMount(){
    if(this.props.wodOfWeek.length === 0){
      this.props.GetWods()
    }
  }
  renderDate(){
    let startDate = this.props.wodOfWeek.start_date
    let endDate = this.props.wodOfWeek.end_date
    if(typeof startDate !== "undefined"){

      var months = ["Января", "Февраля", "Марта", "Апреля", "Мая",
        "Июня", "Июля", "Августа", "Сентября", "Октября", 
        "Ноября", "Декабря"];
      var start = startDate.substring(8, 10)
      var end = endDate.substring(8, 10)
      var startMonth = startDate.substring(5,7)
      var endMonth = endDate.substring(5,7)
      var stMonthNum = 0, endMonthNum = 0
      if(startMonth[0] === "0"){
        startMonth = startMonth[1]
      } 
      stMonthNum = parseInt(startMonth, 10)
      if(endMonth[0] === "0"){
        endMonthNum = endMonth[1]
      }
      endMonthNum = parseInt(endMonth, 10)
      var date = ""
      if(stMonthNum === endMonthNum){
        date = start + " - " + end + " " + months[stMonthNum-1]
      } else {
        date = start + " " + months[stMonthNum-1] + " - " + end + " " + months[endMonthNum-1]
      }

      return (
        <p className="week">{date}</p>
      )
    }
    return <Loader size={20} thickness={2}/>
  }
  renderWods(){
    let wods = this.props.wodOfWeek.wods
    var today = this.props.wodOfWeek.today_date
    if(typeof wods !== "undefined"){
      var style = {}
      return (
        <TableRow>
          {wods.map((wod) => {
           if(today === wod.date_of_wod){
            style = {
              backgroundColor: "#F2F2F2", 
              borderTop: "2px solid #007AFF"
            }
           } else {
            style = {}
           }
           console.log(wod)
           return ( 
            <TableRowColumn key={wod.day_id} style={style}>
              <h4>{wod.date_of_wod}</h4>
            </TableRowColumn>)
          })}
        </TableRow>
      )
    }
    return
  }
  render() {
    return (
      <div className="wod-list">
        <div className="table-nav">
          <div className="inner-nav">
            {this.renderDate()}
            <div className="add">
              <p className="page-title"><b>WOD КАЛЕНДАРЬ</b></p>
              <Link to="/admin/createwod">
                <FlatButton 
                  className="create-wod-btn" 
                  label="Добавить WOD"
                  labelStyle={ styles.labelStyle }
                />
              </Link>
            </div>
          </div>
        </div>
        <Table  
          headerStyle={styles.tableHeader}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable} >
          <TableHeader 
            headerStyle={styles.tableHeader}
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll} >
            <TableRow style={styles.TableRow}>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Понедельник</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Вторник</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Среда</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Четверг</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Пятница</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Суббота</TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Воскресенье</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
              {this.renderWods()}
          </TableBody>
        </Table>
        { !this.props.isMobile && 
        <ScrollToTop showUnder={160}>
          <i className="material-icons to-top">&#xE5D8;</i>
        </ScrollToTop>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isGettingWods: state.admin.gettingWodOfWeek,
  wodOfWeek: state.admin.isWodOfWeekGot
})

const mapDispatchToProps = {
  GetWods: actions.getWeeksWod
}

const Wod = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Wod);

export default Wod
