import React, { Component } from 'react';
import PatientCard from './PatientCard';
import PatientFilter from './PatientFilter';
import ApiClient from '../services/ApiClient';
import _ from 'lodash';

import './ViewPatients.css';
import {patientPriorities, patientPriorityText} from "../utils/enums";

export default class ViewPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ApiClient.getPatientsList()
        .then(
            patients => this.setState({ patients: patients.filter(patient => patient.PatientActive) }),
            error => this.setState({ error: error.message })
        )
  }

  patientFilter(patient) {
    const { jobTypeFilter, wardFilter, priorityFilter } = this.state;

    if (jobTypeFilter && !patient.Jobs.map(job => job.Job).includes(jobTypeFilter)) {
      return false;
    }

    if (wardFilter && patient.LocationWard !== wardFilter) {
      return false;
    }

    if (priorityFilter && patient.PatientPriority.toString() !== priorityFilter) {
      return false;
    }

    return true;
  }

  render() {
    const { patients, error, jobTypeFilter, wardFilter, priorityFilter } = this.state;

    const jobTypes = patients ? _.flatMap(patients, patient => patient.Jobs.map(job => job.Job)) : [];
    const wards = patients ? patients.map(patient => patient.LocationWard) : [];

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
          <div className="ViewPatients-filters">
            <PatientFilter
                title={'Job type'}
                filterValue={jobTypeFilter}
                options={[ ...new Set(jobTypes) ]}
                onChange={jobType => this.setState({ jobTypeFilter: jobType })}/>
            <PatientFilter
                title={'Ward'}
                filterValue={wardFilter}
                options={[ ...new Set(wards) ]}
                onChange={ward => this.setState({ wardFilter: ward })}/>
            <PatientFilter
              title={'Priority'}
              filterValue={priorityFilter}
              options={[ patientPriorities.HIGH, patientPriorities.FIT_FOR_DISCHARGE ]}
              onChange={priority => this.setState({ priorityFilter: priority })}
              displayTextFn={patientPriorityText}/>
          </div>
          {patients
              .filter(patient => this.patientFilter(patient))
              .map(patient => <PatientCard key={patient.id} patient={patient}/>)}
        </div>);
    }
    return <div className="ViewPatients-container">
      <p>No patients to show.</p>
    </div>
  }
}