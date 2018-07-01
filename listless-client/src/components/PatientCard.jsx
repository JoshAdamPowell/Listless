import React, { Component } from 'react';
import getAge from 'get-age';

import './PatientCard.css';
import femaleLogo from '../images/F.svg';
import maleLogo from '../images/M.svg';

export default class PatientCard extends Component {

  render() {
    const { patient } = this.props;
    const patientAge = getAge(patient.DateOfBirth);

    return (
      <div className="PatientCard-container">
        <div className="PatientCard-patient-details">
          <p className="PatientCard-patient-details-ward-title">WARD / BED</p>
          <p className="PatientCard-patient-details-ward">{patient.LocationWard} {patient.LocationBay}.{patient.LocationBed}</p>
          <p className="PatientCard-patient-details-name">{patient.FirstName} {patient.LastName}</p>
          <div>
            <img className="PatientCard-patient-details-sex" src={patient.Gender === 'F' ? femaleLogo : maleLogo} alt=""/>
            <p>{patientAge}</p>
          </div>
          <p>{patient.HospitalNumber}</p>
        </div>
        <div className="PatientCard-medical-history">
          <h2>Medical History</h2>
            <p>{patient.MedicalHistory}</p>
        </div>
        <div className="PatientCard-current-problems">
          <h2>Problems</h2>
          <div className="PatientCard-current-problems-list">
            {patient.Problems
              .filter(problem => problem.Active)
              .map(problem => <p className="PatientCard-current-problems-single" key={problem.id}>{problem.Problem}</p>)}
          </div>
          
        </div>
        <div className="PatientCard-jobs">
          <h2>Jobs</h2>
            {patient.Jobs.map(job => <p key={job.Id}>{job.Job}</p>)}
        </div>
      </div>
    );
  }
}