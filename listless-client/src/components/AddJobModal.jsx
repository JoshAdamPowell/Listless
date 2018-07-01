import React from 'react';
import ApiClient from '../services/ApiClient'
import { jobStatuses } from '../utils/enums'

import './AddJobModal.css'

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
        const job = {
            Job: name,
        }
        ApiClient.postJob(job)
    }

    generateSuggestedJobs() {
        return this.suggestedJobs.map((job) => {
            <button className="AddJobModal-suggested-job" onClick={this.submitJob(job)}>
                {job}
            </button>
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
                        <input ref={el => this.inputElement = el} />
                        <button onClick>
                            Add Job
                        </button>
                    </div>
                </div>
            )
    }
}