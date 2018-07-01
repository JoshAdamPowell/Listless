import React, { Component } from 'react';

import './PatientCard.css';

export default class PatientCard extends Component {
  render() {
    const { patient } = this.props;

    return (
      <div className="PatientCard-container">
        <div className="PatientCard-patient-details">
            <p>{patient.LastName}</p>
            <p>{patient.HospitalNumber}</p>
        </div>
        <div className="PatientCard-medical-history">
            <p>{patient.MedicalHistory}</p>
        </div>
        <div className="PatientCard-current-problems">
            {patient.Problems
                .filter(problem => problem.Active)
                .map(problem => <p key={problem.id}>{problem.Problem}</p>)}
        </div>
        <div className="PatientCard-jobs">
            {patient.Jobs.map(job => <p key={job.Id}>{job.Job}</p>)}
        </div>
      </div>
    );
  }
}