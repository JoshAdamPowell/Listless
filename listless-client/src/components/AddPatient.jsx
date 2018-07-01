import React from 'react';
import ApiClient from '../services/ApiClient'

export default class AddPatient extends React.Component {
  fields = {
    firstName: {
      name: 'First Name',
      type: 'text'
    },
    lastName: {
      name: 'Last Name',
      type: 'text'
    },
    gender: {
      name: 'Gender',
      type: 'text'
    },
    dateOfBirth: {
      name: 'Date of Birth',
      type: 'date'
    },
    hospitalNumber: {
      name: 'Hospital Number',
      type: 'text'
    },
    medicalHistory: {
      name: 'Medical History',
      type: 'text'
    },
    locationBay: {
      name: 'Location Bay',
      type: 'number'
    },
    locationBed: {
      name: 'Location Bed',
      type: 'number'
    },
    locationWard: {
      name: 'Location Ward',
      type: 'text'
    }
  };

  constructor(props) {
    super(props);
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

    this.handleInputChange = this.handleInputChange.bind(this);
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
    ApiClient.postPatient(patient)
      .then(
        patient => ApiClient.postJob({
          Patient: patient.id,
          Job: "Bloods"
        })
      )
      .then(
        result => this.setState({status: 'Patient added successfully!'}),
        error => this.setState({status: 'Error: ' + error.message})
      )
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
              checked={this.state.firstName}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Last name:
            <input
              name="lastName"
              type="text"
              checked={this.state.lastName}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Gender:
            <select
              name="gender"
              value={this.state.gender}
              onChange={this.handleInputChange}>
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
              checked={this.state.dateOfBirth}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Hospital number:
            <input
              name="hospitalNumber"
              type="number"
              checked={this.state.hospitalNumber}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Medical History:
            <input
              name="medicalHistory"
              type="text"
              checked={this.state.medicalHistory}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Location Bay:
            <input
              name="locationBay"
              type="number"
              checked={this.state.locationBay}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Location Bed:
            <input
              name="locationBed"
              type="number"
              checked={this.state.locationBed}
              onChange={this.handleInputChange}/>
          </label>
          <br/>
          <label>
            Location Ward:
            <input
              name="locationWard"
              type="text"
              checked={this.state.locationWard}
              onChange={this.handleInputChange}/>
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
