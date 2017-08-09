import React, { Component } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  display: 'inline-flex',
  position: 'relative',
  marginLeft: '50%',
  marginTop: 10,
  marginBottom: 20,
};

class Loader extends Component {
  render() {
    return (
      <RefreshIndicator
        size={40}
        left={-20}
        top={0}
        status="loading"
        style={style}/>
    )
  }
}

export default Loader;
