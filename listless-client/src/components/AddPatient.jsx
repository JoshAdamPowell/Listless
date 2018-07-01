import React from 'react';
import ApiClient from '../services/ApiClient'
import './AddPatient.css';
import {Redirect} from "react-router";

export default class AddPatient extends React.Component {

  patientToEdit;

  constructor(props) {
    super(props);

    this.patientToEdit = this.props.match.params.patientId;

    this.state = {
      firstName: undefined,
      lastName: undefined,
      gender: "M",
      dateOfBirth: undefined,
      hospitalNumber: undefined,
      medicalHistory: undefined,
      locationBay: undefined,
      locationBed: undefined,
      locationWard: undefined,
      redirectToViewPatients: undefined
    };
  }

  goToViewPatients() {
    this.setState( {redirectToViewPatients: true} );
  }

  componentDidMount() {
    if (this.patientToEdit) {
      ApiClient.getPatient(this.patientToEdit)
        .then(
          patient => {
            console.log("Patient", patient);
            return this.setState({
              firstName: patient.FirstName,
              lastName: patient.LastName,
              gender: patient.Gender,
              dateOfBirth: patient.DateOfBirth,
              hospitalNumber: patient.HospitalNumber,
              medicalHistory: patient.MedicalHistory,
              locationBay: patient.LocationBay,
              locationBed: patient.LocationBed,
              locationWard: patient.LocationWard
            })
          },
          error => this.setState({error: error.message})
        )
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submit() {
    console.log(this.state);

    for (let field in this.fields) {
      if (!this.state[field]) {
        this.setState({
          status: `You have to enter a ${this.fields[field].name} for the patient!`
        });
        return;
      }
    }

    const patient = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      DateOfBirth: this.state.dateOfBirth,
      Gender: this.state.gender,
      HospitalNumber: this.state.hospitalNumber,
      MedicalHistory: this.state.medicalHistory,
      LocationBay: this.state.locationBay,
      LocationBed: this.state.locationBay,
      LocationWard: this.state.locationWard
    };

    let result;

    if (this.patientToEdit) {
      result = ApiClient.putPatient(this.patientToEdit, patient)
    } else {
      result = ApiClient.postPatient(patient)
    }

    result
      .then(
        result => this.goToViewPatients(),
        error => this.setState({status: 'Error: ' + error.message})
      )
  }

  render() {
    if (this.state.redirectToViewPatients) {
      return <Redirect push to={"/"}/>;
    }

    return (
      <div className="container">
        <form>
          <label className="list-item">
            <p className="list-name">First Name:</p>
                <div className="list-input">
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={(event) =>this.handleInputChange(event)}/></div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Last name:</p>
            <div className="list-input">
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={(event) =>this.handleInputChange(event)}/></div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Gender:</p>
            <div className="list-input">
                <select
                name="gender"
                value={this.state.gender}
                onChange={(event) => this.handleInputChange(event)}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
                </select>
            </div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Date of Birth:</p>
            <div className="list-input">
            <input
              name="dateOfBirth"
              type="date"
              value={this.state.dateOfBirth}
              onChange={(event) =>this.handleInputChange(event)}/></div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Hospital number:</p>
            <div className="list-input">
            <input
              name="hospitalNumber"
              type="number"
              value={this.state.hospitalNumber}
              onChange={(event) => this.handleInputChange(event)}/>
              </div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Medical History:</p>
            <div className="list-input">
            <input
              name="medicalHistory"
              type="text"
              value={this.state.medicalHistory}
              onChange={(event) =>this.handleInputChange(event)}className="medical-history"/>
            </div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Location Bay:</p>
            <div className="list-input">
            <input
              name="locationBay"
              type="number"
              value={this.state.locationBay}
              onChange={(event) => this.handleInputChange(event)}/>
              </div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Location Bed:</p>
            <div className="list-input">
            <input
              name="locationBed"
              type="number"
              value={this.state.locationBed}
              onChange={(event) => this.handleInputChange(event)}/>
              </div>
          </label>
          <br/>
          <label className="list-item">
            <p className="list-name">Location Ward:</p>
            <div className="list-input">
            <input
              name="locationWard"
              type="text"
              value={this.state.locationWard}
              onChange={(event) => this.handleInputChange(event)}/>
              </div>
          </label>
        </form>
        <input className="submit" type='submit' onClick={() => this.submit()}/>
        <div>
          {this.state.status ? this.state.status : null}
        </div>
      </div>
    );
  }
}
