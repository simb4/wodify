import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainPage from './Main'
import {
	blue700,
	cyan500,
	blueA700,
} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueA700,
    primary2Color: blue700,
    accent1Color: cyan500,
  },
});

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider muiTheme={muiTheme}>
    		<MainPage />
    	</MuiThemeProvider>
    )
  }
}

export default App;
