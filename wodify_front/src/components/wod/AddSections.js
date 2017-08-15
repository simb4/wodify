import React, { Component } from 'react'
import { connect } from "react-redux"

import * as actions from "../../actions/adminActions"

import "./wod.css"

class _AddSection extends Component {
  render(){
    return(
      <div>
        Sections and Components
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  createWod: actions.createWod
}

const AddSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddSection);

export default AddSection