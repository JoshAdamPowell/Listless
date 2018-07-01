import React from 'react';
import ApiClient from '../services/ApiClient'
import { jobStatuses } from '../utils/enums'

import './AddJobModal.css'
import './Job.css'

export default class AddJobModal extends React.Component {
    constructor(props) {
        super(props)
        this.suggestedJobs = [
            'bloods',
            'X-rays',
            'Something else'
        ]
    }

    submitJob(name) {
        const {patient} = this.props;
        const job = {
            Job: name,
            Patient: patient.id
        }
        ApiClient.postJob(job)
        job.JobStatus = 1
        this.props.callback(job)
    }

    generateSuggestedJobs() {
        return this.suggestedJobs.map((job) => {
            return <div className="AddJobModal-suggested-job Job-job background-blue" onClick={() => this.submitJob(job)}>
                {job}
            </div>
        })
    }

    // submitForm() {
    //     if (this.inputElement.value) {
    //         this.submitJob(this.inputElement.value)
    //     } else {
    //         window.alert('Please enter a name for the job!');
    //     }
    // }

    render() {
        const { patient } = this.props;
            return (
                <div className={"AddJobModal-modal"}>
                    <div className="AddJobModal-modal-content">
                        <span className="AddJobModal-title">
                            Create Job
                </span>
                        <span className="AddJobModal-patient-name">
                            {patient.Name}
                        </span>
                        <label>
                            Custom Job
                        </label>
                        {this.generateSuggestedJobs()}
                        <input className="AddJobModal-input"ref={el => this.inputElement = el} />
                        <button onClick={() => this.submitJob(this.inputElement.value)}>
                            Add Job
                        </button>
                    </div>
                </div>
            )
    }
}