import React, { Component } from 'react';

import './PatientCard.css';

export default class PatientCard extends Component {

  render() {
    const { patient } = this.props;

    // TODO: remove this once the API contains the correct info
    patient.Age = 80;
    patient.FirstName = 'John';
    patient.Gender = 'F';

    return (
      <div className="PatientCard-container">
        <div className="PatientCard-patient-details">
          <p>{patient.LocationWard} {patient.LocationBay}.{patient.LocationBed}</p>
          <p>{patient.FirstName} {patient.LastName}</p>
          <p><span className="PatientCard-gender">{patient.Gender}</span> {patient.Age}</p>
          <p>{patient.HospitalNumber}</p>
        </div>
        <div className="PatientCard-medical-history">
          <h2>Medical History</h2>
            <p>{patient.MedicalHistory}</p>
        </div>
        <div className="PatientCard-current-problems">
          <h2>Problems</h2>
          {patient.Problems
              .filter(problem => problem.Active)
              .map(problem => <p key={problem.id}>{problem.Problem}</p>)}
        </div>
        <div className="PatientCard-jobs">
          <h2>Jobs</h2>
            {patient.Jobs.map(job => <p key={job.Id}>{job.Job}</p>)}
        </div>
      </div>
    );
  }
}