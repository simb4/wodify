import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import Loader from "../elements/Loader"

import FlatButton from 'material-ui/FlatButton'

import "./wod.css"
import ScrollToTop from 'react-scroll-up'
import Divider from 'material-ui/Divider'

import { Redirect } from 'react-router-dom'

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
      startDate: moment(),
      date: moment().format('YYYY-MM-DD'),
      redirect: false
    }
    this.renderWods = this.renderWods.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    if(this.props.wodOfWeek.length === 0){
      this.props.GetWods({date_of_wod: this.state.date})
    }
    var d = moment().format('YYYY-MM-DD')
    this.setState({date: d})
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
  renderComponents(component){
    if(component !== null){
      return component.map((comp) => {
        return (
          <div 
            key={comp.id} 
            style={{marginLeft: "10px"}}
            className="component"
          >
            <p className="component-title">{comp.name}({comp.description ?
             comp.description : "нет описания"})</p>
            <Divider />
          </div>
        )
      })
    }
  }
  renderSections(wod){
    if(wod !== null){
      console.log(wod, 888)
      return wod.components.map(m => {
        return (
          <div key={m.id} className="cmp-section">
            <h4 className="component-title">{m.component.name}</h4>
            <p className="cmp-subtitle">
              {m.description.description}</p><br/>
            <Divider /><br/>
          </div>
        )
      })
    }
    return 
  }

  handleCellClick = (row, column, event) => {
    let wods = this.props.wodOfWeek.wods
    var today = this.props.wodOfWeek.today_date

    var components = []
    var cmp = wods[column-1].wod.components;
    // console.log(cmp[0])
    // console.log(cmp)
    for(var i=0; i<cmp.length; i++){
      components.push({
        id: cmp[i].component.id,
        check: true,
        comp_id: cmp[i].component.id,
        constructor_id: cmp[i].component.score_constructor.constructor.id,
        name: cmp[i].component.name,
        header: cmp[i].component.description.header,
        description: cmp[i].component.description.description,
        scorings: cmp[i].component.description.scorings,
        scoring_id: cmp[i].component.score_constructor.scoring.id,
        rx: cmp[i].component.description.rx,
        rounds: cmp[i].component.description.rounds,
        reps: cmp[i].component.description.reps,
        weight: cmp[i].component.description.weight,
        dist: cmp[i].component.description.dist,
      })
      // console.log(components[i])
    }

    localStorage.setItem('components', JSON.stringify(components))
    localStorage.setItem('wod_id', JSON.stringify(wods[column-1].wod.wod.id))
    this.setState({redirect: true})
  }
  redirect(){

    if(this.state.redirect === true){
       return (
        <Redirect to={{
        pathname: '/createwod/editwod',
        from: '/'}}/>
      )
    }
   
  }
  handleChange(date){
    this.setState({
      startDate: date,
      date: date.format('YYYY-MM-DD'),
    })
    this.props.GetWods({date_of_wod: date.format('YYYY-MM-DD')})
  }
  renderWods(){
    let wods = this.props.wodOfWeek.wods
    var today = this.props.wodOfWeek.today_date
    if(typeof wods !== "undefined"){
      var style = {}
      return (
        <TableRow 
          style={{
          }}>
          {wods.map((wod) => {
           if(today === wod.date_of_wod){
            style = {
              backgroundColor: "#F2F2F2", 
              borderTop: "2px solid #007AFF",
              padding: 0,
              whiteSpace: "pre-line"
            }
           } else {
            style = {
              padding: 0,
              whiteSpace: "pre-line"
              
            }
           }
           return ( 
            <TableRowColumn key={wod.day_id} style={style}>
              <div className="table-td">
                {this.renderSections(wod.wod)}
              </div>
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
        {this.redirect()}
        <div className="table-nav">
          <div className="inner-nav">
            {/*this.renderDate()*/}
            <p className="label"> Выберите дату</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              showYearDropdown
              dateFormatCalendar="MMMM"
              // minDate={moment()}
              maxDate={moment().add(6, "days")}
            />
            <div className="add">
              <p className="page-title"><b>WOD КАЛЕНДАРЬ</b></p>
              <Link to="/createwod">
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
          onCellClick={this.handleCellClick}
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
              <TableHeaderColumn style={styles.TableHeaderColumn}>Понедельник
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Вторник
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Среда
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Четверг
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Пятница
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Суббота
                </TableHeaderColumn>
              <TableHeaderColumn style={styles.TableHeaderColumn}>Воскресенье
                </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
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
