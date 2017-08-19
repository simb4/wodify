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
      component: 0,
      wod: [],
      section: ""
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
  }
  handleChangeComponent = (event, index,component) => {
    this.setState({component})
    const wod = this.state.wod.slice()
    wod.push({
      section: this.state.section,
      component: components[component]
    })
    this.setState({
      wod: wod
    })
  }

  render(){
    return(
      <div>
        <div className="section-list">
          <SelectField
            floatingLabelText="Выберите Секцию"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.renderSectionList()}
          </SelectField>
          <SelectField
              floatingLabelText="Выберите компоненту"
              value={this.state.component}
              onChange={this.handleChangeComponent}
            >
            {this.renderComponentList()}
          </SelectField>
        </div>
        <div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sections: state.wod.getSections,
  components: state.wod.getComponents
})

const mapDispatchToProps = {
  getSections: actions.getSections,
  getComponents: actions.getComponents,
}

const AddSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddSection);

export default AddSection