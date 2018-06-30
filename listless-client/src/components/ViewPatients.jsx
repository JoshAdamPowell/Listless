import React, { Component } from 'react';
import PatientCard from './PatientCard';

export default class ViewPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //ApiClient.getPatients().then(patients => this.setState({ patients }))
        this.setState({
            patients: [
                {
                    Id: 1,
                    HospitalNumber: 100,
                    LastName: 'Fox',
                    DateOfBirth: new Date(1994, 1, 1),
                    MedicalHistory: 'This is some medical history for the patient blah blah blah.',
                    PatientProblems: [
                        {Id: 1, Problem: 'This is a problem', Active: true},
                        {Id: 2, Problem: 'This is another problem', Active: true}
                        ],
                    Jobs: [
                        {Id: 1, Job: 'Blood test', Status: 'Done'},
                        {Id: 2, Job: 'Patient checkup', Status: 'Not done'}
                    ]
                },
                {
                    Id: 2,
                    HospitalNumber: 1004,
                    LastName: 'Feinson',
                    DateOfBirth: new Date(1994, 1, 1),
                    MedicalHistory: 'This is some medical history for the patient blah blah blah.',
                    PatientProblems: [
                        {Id: 1, Problem: 'This is a problem', Active: true},
                        {Id: 2, Problem: 'This is another problem', Active: true}
                        ],
                    Jobs: [
                        {Id: 1, Job: 'Blood test', Status: 'Done'},
                        {Id: 2, Job: 'Patient checkup', Status: 'Not done'}
                    ]
                }
            ]
        });
    }

    render() {
        const { patients } = this.state;

        if (patients) {
            return (
            <div className="ViewPatients-container">
                {patients.map(patient => <PatientCard key={patient.Id} patient={patient}/>)}
            </div>);
        }
        return <div className="ViewPatients-container">
            <p>No patients to show.</p>
        </div>

    }
}