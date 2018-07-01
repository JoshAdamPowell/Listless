import react from 'react';
import ApiClient from '../services/ApiClient'
import JobStatuses from '../utils/enums'

import './AddJobModal.css'

export default class AddJobModal extends React.Component {
    constructor(props) {
        super(props)
        this.suggestedJobs = [
            'bloods',
            'X-rays',
            'Something else'
        ]
        this.state = {
            active: false
        }
    }

    submitJob(name) {
        const job = {
            Name: name,
            Status: JobStatuses.notDone
        }
        ApiClient.postJob(job)
        this.closeModal()
    }

    generateSuggestedJobs() {
        return this.suggestedJobs.map((job) => {
            <button className="AddJobModal-suggested-job" onClick={this.submitJob(job)}>
                {job}
            </button>
        })
    }

    closeModal() {
        this.setState({
            active: false
        })
    }

    openModal(){
        this.setState({
            active: true
        })
    }


    submitForm() {
        if (this.inputElement.value) {
            this.submitJob(this.inputElement.value)
        } else {
            window.alert('Please enter a name for the job!');
        }
    }

    render() {
        const { patient } = this.props;
        const { active } = this.state;
        if (active){
        return (
            <div className={"AddJobModal-modal"}>
                <div className="AddJobModal-modal-content">
                    <span className="AddJobModal-title">
                        Create Job
                </span>
                    <span className="AddJobModal-patient-name">
                        {patient.Name}
                    </span>
                    {this.generateSuggestedJobs()}
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
    } else {
        return <button className='AddJobModal-add-job-button' onClick={()=> this.openModal}> Add Job </button>
    }
    }
}