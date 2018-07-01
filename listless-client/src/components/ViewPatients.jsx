import React, { Component } from 'react';
import PatientCard from './PatientCard';
import ApiClient from '../services/ApiClient';

export default class ViewPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ApiClient.getPatientsList()
        .then(
            patients => this.setState({ patients: patients }),
            error => this.setState({ error: error.message })
        )
  }

  render() {
    const {patients, error} = this.state;

    if (error) {
      return (
        <div>
          <h1>An error occurred</h1>
          <p>{error}</p>
        </div>
      );
    }
    if (patients) {
      return (
        <div className="ViewPatients-container">
          {patients.map(patient => <PatientCard key={patient.id} patient={patient}/>)}
        </div>);
    }
    return <div className="ViewPatients-container">
      <p>No patients to show.</p>
    </div>
  }
}