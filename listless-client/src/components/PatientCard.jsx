import React, { Component } from 'react';
import getAge from 'get-age';

import { patientPriorities, patientPriorityText } from "../utils/enums";

import './PatientCard.css';

export default class PatientCard extends Component {

  getPriorityClass(priority) {
    switch (priority) {
      case patientPriorities.HIGH:
        return 'high';
      case patientPriorities.FIT_FOR_DISCHARGE:
        return 'fit';
      default:
        return '';
    }
  }

  render() {
    const { patient } = this.props;
    const patientAge = getAge(patient.DateOfBirth);
    const priorityClass = this.getPriorityClass(patient.PatientPriority);

    return (
      <div className="PatientCard-container">
        <div className={`PatientCard-priority-${priorityClass}`}>
          <p className="PatientCard-priority-text">{patientPriorityText(patient.PatientPriority)}</p>
        </div>
        <div className="PatientCard-patient-details">
          <p>{patient.LocationWard} {patient.LocationBay}.{patient.LocationBed}</p>
          <p>{patient.FirstName} {patient.LastName}</p>
          <p><span className="PatientCard-gender">{patient.Gender}</span> {patientAge}</p>
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