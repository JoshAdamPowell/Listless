import React from 'react';
import Plus from '../Icons/plus.svg';
import Job from './Job';

export default class ViewJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            addingJob: false
        }
        this.suggestedJobs = [
            "Bloods",
            "X-ray",
            "Physio",
            "Spinal"
        ]
    }

    generateJob(job) {
        return (
            <Job job={job} patient={this.props.patient}/>)
    }

    addButton(){
        const {addingJob} = this.state;
        return(<Plus />)
    }


    render() {
        const { jobs } = this.props;
        return (
            <div className="ViewJobs-jobs-container">
                <div className="ViewJobs-jobs-title">
                    Jobs
                </div>
                {jobs.map(job => this.generateJob(job))}
            </div>
        )
    }
}