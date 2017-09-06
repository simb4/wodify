import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions/wodActions"
import qs from "qs"

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import "./wod.css"

var id = localStorage.getItem("id")
id=JSON.parse(id)
var component = {}
var cmp_id = 0

class _Constructor extends Component {

  constructor(props){
    super(props)
    this.state={
      value: 0,
      id: 0,
      name: "",
      description: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    id = localStorage.getItem('id')
    if(!id){
      localStorage.setItem("id", "-1");
    }
    var wod_id = this.props.wodCreated.id
    if(typeof wod_id !== "undefined"){
      localStorage.setItem('wod_id', wod_id);
    }
    if(!this.props.constructors){
      this.props.listConstructor()
    }
  }

  handleChange=(index, row, value) => {
    this.setState({value})
    this.props.getScoring()
    component = {
      id: id,
      constructor_id: value,
      name: "",
      description: ""
    }

    localStorage.setItem(id, JSON.stringify(component))

    id+=1;
    localStorage.setItem("id", id)
  }

  handleDescription(e){
    var desc = e.target.value
    var wod = localStorage.getItem(cmp_id)
    wod = JSON.parse(wod)
    wod.description = desc
    wod = JSON.stringify(wod)
    localStorage.setItem(cmp_id, wod)
    this.setState({description: desc})
  }

  handleWodName(event){
    var name = event.target.value
    var wod = localStorage.getItem(cmp_id)
    wod = JSON.parse(wod)
    wod.name = name
    wod = JSON.stringify(wod)
    localStorage.setItem(cmp_id, wod)
    this.setState({name: name})
  }

  renderComponent(cmp){
    return(
      <div key={cmp.id} className="component-item">
        <div className="description">
          <input 
            value = {cmp.name}
            className="wod-name" 
            placeholder="название компоненты"
            onChange={this.handleWodName.bind(this)}
            onClick={() => { cmp_id = cmp.id}}/>
          <textarea 
            className="textarea"
            onChange={
              this.handleDescription.bind(this)
            }
            value = {cmp.description}
            onClick={() => { cmp_id = cmp.id}}
            placeholder="описание компоненты"
          />
        </div>
        <div className="scoring">
          <p>Scoring</p>
          {console.log(cmp)}
        </div>
      </div>
    )
  }

  renderComponents(){
    if(localStorage.getItem("id"))
    var components = []
    for(var i=0; i<id; i++){
      var cur = localStorage.getItem(i)
      if(cur){
        components.push(JSON.parse(cur))
      }
    }
    return components.map((cmp) => {
      return this.renderComponent(cmp)
    })
  }

  handleSubmit(){
    var components = []
    for(var i=1; i<id; i++){
      var cur = localStorage.getItem(i)
      if(cur){
        components.push(JSON.parse(cur))
      }
    }
    console.log(components)
  }

  renderPage(){
    return (
      <div className="section-wrapper">
        <div className="section-list">
        <SelectField
          floatingLabelText="Создать новую компоненту"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={0} primaryText="---------" />
          <MenuItem value={1} 
          primaryText="Тяжелая атлетика" />
          <MenuItem value={3} 
          primaryText="Гимнастика" />
          <MenuItem value={2} 
          primaryText="Меткон" />
          <MenuItem value={4} 
          primaryText="Разминка" />
        </SelectField><br/>
        {console.log(this.props.constructors, 6766)}
      </div>
      <div className="components">
        {this.renderComponents()}
      </div>
      <RaisedButton 
        label="Создать"
        onClick={this.handleSubmit}
      />
    </div>
    )
  }

  render(){
    return (
      <div className="renderWod-page">
        {this.renderPage()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sections: state.wod.getSections,
  components: state.wod.getComponents,
  newSections: state.wod.sections,
  newComponents: state.wod.components,
  wodCreated: state.admin.isWodCreated,
  scoring: state.wod.scoring,
  constructors: state.wod.constructors
})

const mapDispatchToProps = {
  getSections: actions.getSections,
  getComponents: actions.getComponents,
  createSection: actions.createSection,
  createComponent: actions.createComponent,
  fillWod: actions.fillWod,
  clearWodCreated: actions.clearWodCreated,
  getScoring: actions.getScoresById,
  listConstructor: actions.listConstructor
}

const Constructor = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Constructor);

export default Constructor