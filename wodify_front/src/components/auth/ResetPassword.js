import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

class _ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: "",
      confirm: ""
    }
  }
  handleResetPassword(){}

  render(){
    return(
      <div>
        <div className="auth-title">
          На вашу почту было отправлено письмо с новым паролем
        </div><br/><br/>
        <div className="auth-submit">
          <div className="errors-block">{this.props.errorMessage}</div>
          <RaisedButton label="Ok" className="orangeBtn" primary={true}
            onClick={this.handleResetPassword} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {};

const ResetPasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ResetPassword);

export default ResetPasswordPage;