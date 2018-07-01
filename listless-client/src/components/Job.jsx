import React from 'react';
import Reset from '../Icons/reset.svg';

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
        const currentStatus = this.state.job.Status;
        let newStatus;
        switch (currentStatus) {
            case this.JobStates.NotDone:
                newStatus = this.JobStates.Done;
                break;
            case this.JobStates.Done:
                if (window.confirm("Please confirm you've checked the results, this job will be hidden after today.")) {
                    newStatus = this.JobStates.ResultsChecked
                }
        }
        const job = this.state.job;
        job.Status = newStatus;
        this.setState({
            job: job
        })
    }


    generateReset() {
        if (this.state.job.Status === this.JobStates.ResultsChecked) {
            return (<img onClick={(event) => {
                event.stopPropagation();
                this.onReset()
            }} src={Reset} className='Job-reset'/>);
        }
    }

    onReset() {
        const job = this.state.job;
        job.Status = this.JobStates.NotDone
        this.setState({
            job: job
        });
    }

    render() {
        const { job } = this.state;
        return (job ? <div className={'Job-job ' + this.getColour(job.Status)} onClick={(() => this.changeStatus())}>
            {job.Name}
            {this.generateReset()}
        </div> : null)
    }
}