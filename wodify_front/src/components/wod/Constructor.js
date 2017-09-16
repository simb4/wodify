import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions/wodActions"
import { Redirect } from 'react-router-dom'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import "./wod.css"

var cur_id = 0

class _Constructor extends Component {

  constructor(props){
    super(props)

    this.state={
      e_cmp_value: 0,
      value: 0,
      id: 0,
      name: "",
      description: "",
      componentItem: {},
      deleteAll: false,
      score_id: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount(){
    if(this.props.wodCreated){
      this.props.clearWodCreated()
    }
    var id = this.props.wodCreated.id
    if(id){
      localStorage.setItem('wod_id', id);
    }
    if(!this.props.components){
      this.props.getComponents()
    }
    if(!localStorage.getItem('id')){
      localStorage.setItem('id', "0")
    }
    var components = JSON.stringify([])
    if(!localStorage.getItem('components'))
      localStorage.setItem('components', components)
    if(this.props.constructors.length === 0){
      this.props.listConstructor()
    }
  }

  handleCmp=(index, row, value) => {
    this.setState({value})
    var component = {}
    var all_cmp = this.props.components
    var key_id = JSON.parse(localStorage.getItem('id'))
    localStorage.setItem('id', key_id + 1)
    for(var i=0; i<all_cmp.length; i++){
      if(all_cmp[i].id === value){
        component = {
          id: key_id,
          comp_id: all_cmp[i].comp_id, 
          constructor_id: all_cmp[i].constructor_id,
          name: all_cmp[i].name,
          header: all_cmp[i].header,
          description: all_cmp[i].description,
          scorings: all_cmp[i].scorings,
          scoring_id: all_cmp[i].scoring_id,
          rx: all_cmp[i].rx,
        }
      }
    }

    this.setState({componentItem: component})
  }

  handleChange=(index, row, value) => {

    this.props.getScoring({constructor_id: value})
    this.setState({value})
    var component = {}
    var key_id = JSON.parse(localStorage.getItem('id'))
    localStorage.setItem('id', key_id + 1)
    var sc = JSON.parse(localStorage.getItem('scores'))
    console.log(sc, 'scores')
    for(var i=0; i<this.props.constructors.length; i++){
      if(this.props.constructors[i].id === value){
        component = {
          id: key_id,
          check: true,
          comp_id: null,
          constructor_id: value,
          name: this.props.constructors[i].name,
          header: this.props.constructors[i].name,
          description: "",
          scorings: sc,
          scoring_id: "",
          rx: false,
        }
      }
    }
    this.setState({componentItem: component})
  }

  handleDescription(e){
    console.log(cur_id)
    var desc = e.target.value
    var cmp = localStorage.getItem('components')
    cmp = JSON.parse(cmp)

    for(var i=0; i<cmp.length; i++){
      if(cmp[i].id === cur_id){
        cmp[i].description = desc;
      }
    }

    localStorage.setItem('components', JSON.stringify(cmp))
    this.setState({description: desc})
  }

  handleWodName(event){                 
    var cmp = localStorage.getItem('components')
    cmp = JSON.parse(cmp)
    var name = event.target.value

    for(var i=0; i<cmp.length; i++){
      if(cmp[i].id === cur_id){
        cmp[i].name = name;
      }
    }

    localStorage.setItem('components', JSON.stringify(cmp))
    this.setState({name: name})
  }

  renderComponent=() => {
    if(this.state.componentItem.name){
      var components = localStorage.getItem('components')
      components = JSON.parse(components)
      var cmp = this.state.componentItem
      cmp.scorings = JSON.parse(localStorage.getItem('scores'))
      this.setState({componentItem: cmp})
      // this.state.componentItem.scorings = 
      //   JSON.parse(localStorage.getItem('scores'))
      components.push( this.state.componentItem )
      components = JSON.stringify(components)
      localStorage.setItem('components', components)
      this.setState({
        componentItem: {},
        id: 0,
        value: 0,
        name: "",
        description: "" 
      })
    }
  }

  renderScoring(s){
    if(s){
      return s.map(scr => {
        return <MenuItem 
          value={scr.id} 
          key={scr.id} 
          primaryText={scr.name}
        />
      })
    }
  }

  handleScoring=(index, row, value) => {
    var cmp = 
      JSON.parse(localStorage.getItem('components'))

    for(var i = 0; i<cmp.length; i++){
      if(cmp[i].id === cur_id){
         cmp[i].scoring_id = value
         break;
      }
    }

    localStorage.setItem('components', JSON.stringify(cmp))
    this.setState({score_id: value})
  }

  removeCmp(id){
    var cmp = JSON.parse(localStorage.getItem('components'))
    var new_cmp = []

    cmp.map(c => {
      if(c.id !== id){
        new_cmp.push(c)
      }
      return 0
    })

    localStorage.setItem('components', JSON.stringify(new_cmp))
    this.setState({check: true})
  }

  renderComponents(){
    var components = localStorage.getItem('components')
    var cur_score = 0
    if(components){
      components = JSON.parse(components)
      return components.map((cmp, i) => {
        if(cmp.scoring_id){
          cur_score = cmp.scoring_id
        }
        return(
          <div key={i} className="component-item">
            <div className="description">
              <input 
                value={cmp.name}
                className="wod-name" 
                placeholder="название компоненты"
                onClick={()=> {cur_id = cmp.id}}
                onChange={this.handleWodName.bind(this)}/>
              <textarea 
                className="textarea"
                onClick={()=> cur_id = cmp.id}
                onChange={
                  this.handleDescription.bind(this)
                }
                value={cmp.description}
                placeholder="описание компоненты"
              />
            </div>
            <div className="scoring">
              <SelectField
                floatingLabelText="Scoring"
                value={cur_score}
                onChange={this.handleScoring}
                onClick={() => cur_id = cmp.id}
                // labelStyle={{paddingLeft: '8px'}}
                >
                {this.renderScoring(cmp.scorings)}
              </SelectField>
            </div>
            <FlatButton 
              label="Удалить"
              className="delete-cmp-btn"
              onClick={() => {
                this.removeCmp(cmp.id)
              }}
            />
          </div>
        )
      })
    } else {
      return
    }
  }

  redirectToMain() {
    if(this.props.wodFilled){

      localStorage.removeItem('wod_id')
      localStorage.removeItem('components')
      localStorage.removeItem('scores')
      localStorage.removeItem('id')

      return  <Redirect to={{
                pathname: '/admin',
                from: '/admin/createwod/constructor'}}/>
    }
  }

  handleSubmit(){
    var cmp = JSON.parse(localStorage.getItem('components'))

    var submitting = []
    cmp.map(c => {
      var r = {
        component_id: c.comp_id,
        description: {
          name: c.name,
          constructor_id: c.constructor_id,
          info: {
            rx: c.rx,
            description: c.description,
            header: c.header,
          },
          scoring_id: c.scoring_id,
        },
      }
      submitting.push(r)
      return 0
    })

    var id = localStorage.getItem('wod_id')
    id = JSON.parse(id)

    let data = {
      wod_id: id,
      components: submitting
    }

    console.log(data)

    this.props.fillWod(data)

  }

  handleClear=() => {
    localStorage.setItem('components', JSON.stringify([]))
    localStorage.setItem('id', "0")
    this.setState({deleteAll: true})
  }

  renderExCmp(){
    return this.props.components.map((cmp) => {
      return <MenuItem 
      value={cmp.id} 
      key={cmp.id} 
      primaryText={cmp.name} />
    })
  }

  renderConstructor(){
    if(this.props.constructors)
      return this.props.constructors.map((c) => {
        return <MenuItem
          value={c.id} 
          key={c.id} 
          primaryText={c.name}
          />
      })
  }

  renderPage(){
    return (
      <div className="section-wrapper">
        <div className="section-list">
        <SelectField
          floatingLabelText="Выбрать компоненту"
          value={this.state.e_cmp_value}
          onChange={this.handleCmp}
        ><MenuItem value={0} primaryText="---------" />
          {this.renderExCmp()}
        </SelectField><br/>
        <SelectField
          floatingLabelText="Создать новую компоненту"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={0} primaryText="---------" />
          {this.renderConstructor()}
        </SelectField><br/>
        <FlatButton 
          label="Добавить"
          className="add-constructor-btn"
          style={{marginLeft: "40%"}}
          onClick={this.renderComponent}
        />
      </div>
      <div className="components">
        {this.renderComponents()}
      </div>
      <RaisedButton 
        label="Создать"
        onClick={this.handleSubmit}
      />
      <RaisedButton 
        label="Удалить все"
        onClick={this.handleClear}
      />
    </div>
    )
  }

  render(){
    return (
      <div className="renderWod-page">
        {this.renderPage()}
        {this.r}
        {this.redirectToMain()}
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
  wodFilled: state.wod.isWodFilled,
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
  getScoring: actions.getScoreTypes,
  listConstructor: actions.listConstructor
}

const Constructor = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Constructor);

export default Constructor