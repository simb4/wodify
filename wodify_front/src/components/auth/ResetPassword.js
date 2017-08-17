import React, { Component } from 'react';
import { connect } from 'react-redux';

class _ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: "",
      confirm: ""
    }
  }

  render(){
    return(
      <div>
        <div className="auth-title">
          На вашу почту {this.props.email} было 
            отправлено письмо cо ссылкой на сброс пароля 
        </div><br/><br/>
        <div className="auth-submit">
          <div className="errors-block">{/*this.props.errorMessage*/}</div>
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