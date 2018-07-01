import React from 'react';
import Reset from '../Icons/reset.svg';
import ApiClient from '../services/ApiClient'

import './Job.css'

export default class Job extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.JobStates = Object.freeze({
            NotDone: 1,
            Done: 2,
            ResultsChecked: 3
        });
    }

    componentDidMount() {
        const { job } = this.props;
        this.setState({
            job: job
        })
    }

    getColour(status) {
        switch (status) {
            case this.JobStates.NotDone:
                return 'background-red'
            case this.JobStates.Done:
                return 'background-amber'
            case this.JobStates.ResultsChecked:
                return 'background-green'
        }
    }

    changeStatus() {
        console.log('a')
        const { patient } = this.props;
        const currentStatus = this.state.job.JobStatus;
        let newStatus = currentStatus;
        switch (currentStatus) {
            case this.JobStates.NotDone:
                newStatus = this.JobStates.Done;
                break;
            case this.JobStates.Done:
                if (window.confirm("Please confirm you've checked the results, this job will be hidden after today.")) {
                    newStatus = this.JobStates.ResultsChecked
                }
                break;
        }
        const job = this.state.job;
        job.JobStatus = newStatus;
        this.setState({
            job: job
        })
        ApiClient.putJob(job.id, {
            'Job': job.Job,
            'Patient': patient.id,
            'JobStatus' : newStatus
        })
    }


    generateReset() {
        if (this.state.job.JobStatus === this.JobStates.ResultsChecked) {
            return (<img onClick={(event) => {
                event.stopPropagation();
                this.onReset()
            }} src={Reset} className='Job-reset'/>);
        }
    }

    onReset() {
        const job = this.state.job;
        job.JobStatus = this.JobStates.NotDone
        this.setState({
            job: job
        });
    }

    render() {
        const { job } = this.state;
        return (job ? <div className={'Job-job ' + this.getColour(job.JobStatus)} onClick={(() => this.changeStatus())}>
            {job.Job}
            {this.generateReset()}
        </div> : null)
    }
}