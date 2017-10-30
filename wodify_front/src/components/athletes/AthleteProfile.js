import React, { Component } from 'react'
import { connect } from 'react-redux';
import {SERVER_URL} from '../../constants/server'
import moment from 'moment';
import Divider from 'material-ui/Divider'
import { FileUpload } from 'redux-file-upload'
import * as actions from '../../actions/adminActions';

import { toFormData } from '../../constants/transform.js'

var athlete;

class _AthleteProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
  }

  componentWillMount(){
    localStorage.removeItem('redirect')
    athlete = JSON.parse(localStorage.getItem("athlete"))

    console.log(athlete)
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file

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
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

  }

  render(){
    return (
      <div className="container">
        <div className="profileHeader">
          <img className="ava" src={SERVER_URL + athlete.avatar_url}/>
          <div className="info">
            <h2>{athlete.first_name + " " + athlete.last_name}</h2>
            <br/>
            <Divider  inset={true}/>
            <p>Email: {athlete.username}</p>
            <p>Mобильный телефон: {athlete.phone_number}</p>
            <p>День рождения: {athlete.date_of_birth}</p>
            <p>Город: {athlete.city.name}</p>
            <p>Зал: {athlete.gym.name + ' (' + athlete.gym.address + ')'}</p>
          </div> 
        </div>
         <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleFileChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Отправить</button>
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






