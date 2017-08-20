import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../../actions/wodActions"

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
      components: {}
    }
  }
  componentWillMount(){
    if(this.props.sections.length === 0){
      this.props.getSections()
    }
  }

  componentWillUpdate(){
    // this.props.getComponents({section_id: this.state.value})
  }
  // componentWillReceiveProps(nextProps){
  //   this.props.getComponents({section_id: this.state.value})
  // }
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
      section: sections[value]
    })
    var allSections = this.props.newSections.slice()
    allSections.push(sections[value])

    this.props.createSection(allSections)
  }
  handleChangeComponent = (event, index,componentValue) => {
    this.setState({componentValue})

    const wod = this.state.wod.slice()
    wod.push({
      section: this.state.section,
      component: components[componentValue]
    })
    this.setState({
      wod: wod
    })
    console.log(this.props.newSection)

  }

  renderWod(){
    var storage = localStorage.getItem('sections');
    storage = JSON.parse(storage)
    console.log(storage)
    // localStorage.removeItem('sections')
    // return this.state.wod.map((w)=>{
    //   return (
    //     <div className="wods" key={w.component.id}>
    //       {console.log(w)}
    //       <h3>{w.section}</h3>
    //       <pre>    {w.component.name} ({w.component.description ? 
    //         w.component.description : "нет описания"})</pre>
    //     </div>
    //   )
    // })
    if(storage)
      return storage.map((s, i) => {
        return <p key={i}>{s}</p>
      })
    return
  }

  render(){
    return(
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
          {this.renderWod()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sections: state.wod.getSections,
  components: state.wod.getComponents,
  newSections: state.wod.sections
})

const mapDispatchToProps = {
  getSections: actions.getSections,
  getComponents: actions.getComponents,
  createSection: actions.createSection,
}

const AddSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddSection);

export default AddSection