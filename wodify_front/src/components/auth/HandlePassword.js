import React, { Component } from 'react';
import { connect } from 'react-redux';

import VTextField from '../elements/VTextField';

import FlatButton from 'material-ui/FlatButton';

import '../../styles/Styles.css';

class _HandlePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: '',
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({error: nextProps.errorMessage});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value, error: ''});
  }
  handleEnter(target) {
    if(target.charCode === 13){
      this.handleSubmit();
    }
  }
  handleSubmit(){
    if(this.state.password === ''){
      this.setState({ error: "Заполните поле"});
      return;
    }
    this.props.onSubmit({password: this.state.password});
  }
  render(){
    var isDisabled = this.props.isLoading || this.state.password === "";
    return (
     <div>
        <VTextField id="password"
          autoFocus
          fullWidth={true}
          name="username"
          floatingLabelText="Введите ваш пароль"
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
          type="password"
          onKeyPress={this.handleEnter.bind(this)}
          errorText={this.state.error}
        />
        <div className="auth-submit">
          <div className="link-orange cursorable" 
            onClick={this.props.onResetClick}>Забыли пароль?</div>
          <FlatButton
            label="Далее"
            primary={true}
            onClick={this.handleSubmit.bind(this)}
            disabled={isDisabled} />
        </div>
        <div className="auth-back">
          <FlatButton fullWidth={false} className="orangeText centerElements" 
            onClick={this.props.onBackClick}>
            <i className="material-icons">&#xE5C4;</i>
            <span>Назад</span>
          </FlatButton>
        </div>
      </div>
      )
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoggingIn,
})

const mapDispatchToProps = {}

const HandlePasswordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HandlePassword);

export default HandlePasswordPage;
