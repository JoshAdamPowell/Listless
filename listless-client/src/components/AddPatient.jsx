import React from 'react';
import ApiClient from '../services/ApiClient'

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
      locationWard: undefined
    };
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

    if (this.patientToEdit) {
      ApiClient.putPatient(this.patientToEdit, patient)
        .then(
          result => this.setState({status: 'Patient updated successfully!'}),
          error => this.setState({status: 'Error: ' + error.message})
        )
    } else {
      ApiClient.postPatient(patient)
        .then(
          result => this.setState({status: 'Patient added successfully!'}),
          error => this.setState({status: 'Error: ' + error.message})
        )
    }
  }

  render() {
    return (
      <div>
        <form>
          <label>
            First name:
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Last name:
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Gender:
            <select
              name="gender"
              value={this.state.gender}
              onChange={(event) => this.handleInputChange(event)}>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </label>
          <br/>
          <label>
            Date of Birth:
            <input
              name="dateOfBirth"
              type="date"
              value={this.state.dateOfBirth}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Hospital number:
            <input
              name="hospitalNumber"
              type="number"
              value={this.state.hospitalNumber}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Medical History:
            <input
              name="medicalHistory"
              type="text"
              value={this.state.medicalHistory}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Location Bay:
            <input
              name="locationBay"
              type="number"
              value={this.state.locationBay}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Location Bed:
            <input
              name="locationBed"
              type="number"
              value={this.state.locationBed}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
          <br/>
          <label>
            Location Ward:
            <input
              name="locationWard"
              type="text"
              value={this.state.locationWard}
              onChange={(event) => this.handleInputChange(event)}/>
          </label>
        </form>
        <input type='submit' onClick={() => this.submit()}/>
        <div>
          {this.state.status ? this.state.status : null}
        </div>
      </div>
    );
  }
}
