import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions/wodActions"

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'

import "./wod.css"

var sections = {}
var components = {}

class _AddSection extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      componentValue: 0,
      wod: [],
      section: "",
      components: {},
      weight: false,
      sets: 0,
      reps: 0,
    }
  }
  componentWillMount(){
    if(this.props.sections.length === 0){
      this.props.getSections()
    }
    
    var id = this.props.wodCreated.id
    if(typeof id !== "undefined"){
      localStorage.setItem('wod_id', this.props.wodCreated.id);
    }
  }

  renderSectionList(){
    if(this.props.sections){
      return this.props.sections.map((s) => {
        sections[s.id] = s.name
        return  <MenuItem key={s.id} value={s.id} 
          primaryText={s.name} />
      })
    }
  }
  renderComponentList(){
    if(this.props.components){
      return this.props.components.map((c) => {
        components[c.id] = c
        return  <MenuItem key={c.id} value={c.id} 
          primaryText={c.name} />
      })
    }
  }      

  handleChange = (event, index, value) => {
    components = {}
    this.setState({value})
    if(this.state.value !== value){
      this.props.getComponents({section_id: value})
    }
    this.setState({
      section: sections[value],
      sets: 0,
      reps: 0,
      weight: false,
    })
    var allSections = localStorage.getItem('sections');
    allSections = JSON.parse(allSections)
    if(!allSections){
      allSections = this.props.newSections.slice()
    }

    allSections.push(sections[value])

    this.props.createSection(allSections)
  }
  handleChangeComponent = (event, index,componentValue) => {
    this.setState({componentValue})

    var allComponents = localStorage.getItem('components')
    allComponents = JSON.parse(allComponents)

    if(!allComponents){
      allComponents = this.props.newComponents
    }

    var newComponent = components[componentValue]

    if(this.state.weight){
      newComponent = {...newComponent, sets: this.state.sets, 
      reps: this.state.reps}
    }

    allComponents.push(newComponent)

    this.props.createComponent(allComponents)

  }

  handleSets = (event) => {
    this.setState({sets: event.target.value, weight: true})
  }

  handleReps= (event) => {
    this.setState({reps: event.target.value, weight: true})
  }

  handleSubmit = () => {

    var submitSections = localStorage.getItem('sections');
    var submitComponents = localStorage.getItem('components');

    submitSections = JSON.parse(submitSections)
    submitComponents = JSON.parse(submitComponents)


    var submitting = []
    submitSections.map((m, i)=>{
      var r = {
        section: m,
        components: submitComponents[i]
      }
      submitting.push(r)
      return 
    })

    var submitting2 = []

    submitting.map((m, i) => {
      var r = {
        component_id: m.components.id,
        description: m
      }
      submitting2.push(r)
      return 
    })

    var id = localStorage.getItem('wod_id')
    id = JSON.parse(id)

    let data = {
      wod_id: id,
      components: submitting2
    }

    this.props.fillWod(data)
    return 
    // this.props.clearWodCreated()

  }

  renderScoringType(type){
    if(type === 3){
      return (  
        <div className="weight-scoring">
          <input 
            placeholder="sets" 
            className="weight-input"
            onChange={this.handleSets.bind(this)}
          ></input>
          <pre> X </pre>
          <input 
            placeholder="reps" 
            className="weight-input"
            onChange={this.handleReps.bind(this)}
          ></input>
        </div>
      )
    }
  }
  renderWod(){
    var sectionsFromStorage = localStorage.getItem('sections');
    var componentsFromStorage = localStorage.getItem('components');

    sectionsFromStorage = JSON.parse(sectionsFromStorage)
    componentsFromStorage = JSON.parse(componentsFromStorage)

    if(sectionsFromStorage)
      return sectionsFromStorage.map((s, i) => {
        if(componentsFromStorage && typeof componentsFromStorage[i] !== "undefined"){
          return (
            <div key={i} className="section-box">
              <h3>{s}</h3>
              <div className="component-box">
                <div className="component-name">
                  <p>{componentsFromStorage[i].name}</p>
                </div>
                <div className="component-scoring">
                  <h3>Метод оценки</h3>
                  <p>{componentsFromStorage[i].scoring.name}</p>
                  {this.renderScoringType(componentsFromStorage[i].scoring.id)}
                </div>
              </div>
            </div>
          )
        }
        return (
          <div key={i} className="section-box">
            <h3 key={i}>{s}</h3>
          </div>
        )
      })
    return
  }

  renderPage(){
    return (
      <div className="section-wrapper">
        <div className="section-list">
        <SelectField
          floatingLabelText="Выберите Секцию"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.renderSectionList()}
        </SelectField><br/>
        <SelectField
            floatingLabelText="Выберите компоненту"
            value={this.state.componentValue}
            onChange={this.handleChangeComponent}
          >
          {this.renderComponentList()}
        </SelectField>
      </div>
      <div className="components">
        <h3 className="sectionbox-title">Секции</h3>
        {this.renderWod()}
      </div>
      <RaisedButton 
        className="fillWod-btn"
        label="Создать" 
        onClick={this.handleSubmit.bind(this)}
      />
    </div>
    )
  }

  render(){
    return(
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
})

const mapDispatchToProps = {
  getSections: actions.getSections,
  getComponents: actions.getComponents,
  createSection: actions.createSection,
  createComponent: actions.createComponent,
  fillWod: actions.fillWod,
  clearWodCreated: actions.clearWodCreated
}

const AddSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddSection);

export default AddSection