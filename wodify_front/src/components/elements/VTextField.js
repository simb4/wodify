import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

const BLUE_TEXTFIELD = {
  errorStyle: {
    position: 'absolute',
    bottom: '-10px',
  },
  underlineStyle: {
    borderColor: '#2F80ED',
  },
  floatingLabelStyle: {
    color: 'rgba(0,0,0,.38)',
  },
  floatingLabelFocusStyle: {
    color: '#2F80ED',
  },
};

class VTextField extends Component {
  render() {
    return (
      <TextField
        {...this.props}
        errorStyle={BLUE_TEXTFIELD.errorStyle}
        floatingLabelStyle={BLUE_TEXTFIELD.floatingLabelStyle}
        underlineFocusStyle={BLUE_TEXTFIELD.underlineStyle}
      />
    )
  }
}

export default VTextField;