import React, { Component } from 'react';
import getAge from 'get-age';
import AddJobModal from './AddJobModal'
import Job from './Job'

import { patientPriorities, patientPriorityText } from "../utils/enums";

import './PatientCard.css';
import femaleLogo from '../images/F.svg';
import maleLogo from '../images/M.svg';
import { Redirect } from 'react-router';

export default class PatientCard extends Component {

  constructor(props) {
    super(props);
    this.state = {redirectToEdit: false};
  }
  edit () {
    this.setState( {redirectToEdit: true} );
  }

  getPriorityClass(priority) {
    switch (priority) {
      case patientPriorities.HIGH:
        return 'high';
      case patientPriorities.FIT_FOR_DISCHARGE:
        return 'fit';
      default:
        return 'standard';
    }
  }

  render() {
    const {patient} = this.props;
    console.log(patient);

    if (this.state.redirectToEdit) {
      return <Redirect push to={"/editPatient/" + patient.id}/>;
    }
    const patientAge = getAge(patient.DateOfBirth);
    const priorityClass = this.getPriorityClass(patient.PatientPriority);

    // return <button onClick={this.handleOnClick} type="button">Button</button>;
    return (
      <div className="PatientCard-container">
        <div className={`PatientCard-priority-${priorityClass}`}>
          <p className="PatientCard-priority-text">{patientPriorityText(patient.PatientPriority)}</p>
        </div>
        <div className="PatientCard-inner-container">
          <div className="PatientCard-patient-details">
          <p className="PatientCard-patient-details-ward-title">WARD / BED</p>
          <p className="PatientCard-patient-details-ward">{patient.LocationWard} {patient.LocationBay}.{patient.LocationBed}</p>
          <p className="PatientCard-patient-details-name">{patient.FirstName} {patient.LastName}</p>
          <div className="PatientCard-patient-details-sex-age-block">
            {patient.Gender === 'F' && <img className="PatientCard-patient-details-sex" src={femaleLogo} alt=""/>}
            {patient.Gender === 'M' && <img className="PatientCard-patient-details-sex" src={maleLogo} alt=""/>}
            {patient.Gender === 'O' && <div>Other</div>}
            <div>
              <p className="PatientCard-patient-details-age">{patientAge}</p>
            </div>
          </div>
          <p className="PatientCard-patient-details-hospital-number">{patient.HospitalNumber}</p>
          <button onClick={() => this.edit()} type="button">Edit</button>
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
            {patient.Jobs.map(job => <Job job={job} patient={patient}/>)}
            <AddJobModal patient={patient} />
        </div>
      </div>
      </div>
    );
  }
}