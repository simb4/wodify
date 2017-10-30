import React, { Component } from 'react'
import { connect } from 'react-redux';
import {SERVER_URL} from '../../constants/server'
import moment from 'moment';
import Divider from 'material-ui/Divider'
import { FileUpload } from 'redux-file-upload'
import * as actions from '../../actions/adminActions';
import RaisedButton from 'material-ui/RaisedButton';

import { toFormData } from '../../constants/transform.js'

var athlete;

class _AthleteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      submit: false,
    };
  }

  componentWillMount(){
    localStorage.removeItem('redirect')
    athlete = JSON.parse(localStorage.getItem("athlete"))

    console.log(athlete)
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.setState({submit: true})

    let cur_data = {
      athlete_id: athlete.id,
      date_of_measure: moment().format('YYYY-MM-DD'),
      csv_file: this.state.file
    }

    let data = toFormData(cur_data)
    console.log(data, 'CSV')
    console.log(cur_data, 'data')
    this.props.uploadCSV(data);

  }

  _handleFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    reader.readAsDataURL(file)
  }

  render(){
    return (
      <div className="container">
        <div className="profileHeader">
          <img className="ava" src={athlete.avatar_url ? 
            SERVER_URL + athlete.avatar_url : require('./ava.png')}/>
          <div className="info">
            <h2>{athlete.first_name + " " + athlete.last_name}</h2>
            <br/>
            <Divider  inset={true}/>
            {console.log(athlete)}
            <p>Email: {athlete.username}</p>
            <p>Mобильный телефон: {athlete.phone_number}</p>
            <p>День рождения: {athlete.date_of_birth}</p>
            <p>Город: {athlete.city ? athlete.city.name : '-'}</p>
            <p>Зал: {athlete.gym.name + ' (' + athlete.gym.address + ')'}</p>
          </div> 
        </div>
        <form 
          onSubmit={(e)=>this._handleSubmit(e)}
          className="uploadCSV-form"
        >
          <h4 className="center">Загрузить результаты InBody</h4>
          <input className="fileInput" 
            type="file" 
            id="csv"
            onChange={(e)=>this._handleFileChange(e)} />
            <label htmlFor="csv">{this.state.file ? "Изменить файл" : "Выбрать файл"}</label>
            <p className="fileName">Файл: {this.state.file ? this.state.file.name : "не выбран"}</p>
            <RaisedButton 
              label="Загрузить" 
              primary={true}
              type="submit"
              onClick={(e)=>this._handleSubmit(e)}
              className="uploadCSV-btn"
            />
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  athleteList: state.admin.athleteList,
  csvUploaded: state.admin.csvUploaded

})

const mapDispatchToProps = {
  uploadCSV: actions.uploadCSV,
  clearFlags: actions.clearFlags
}

const AthleteProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AthleteProfile);

export default AthleteProfile






