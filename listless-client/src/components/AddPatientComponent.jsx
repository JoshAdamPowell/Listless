import React from 'react';
import ApiClient from '../services/ApiClient'

export default class AddPatientComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                firstNameField: {
                    name: 'First Name',
                    type: 'text'
                },
                lastNameField: {
                    name: 'Last Name',
                    type: 'text'
                },
                gender: {
                    name: 'Gender',
                    type: 'text'
                },
                dobField: {
                    name: 'Date of Birth',
                    type: 'date'
                },
                hospitalNumberField: {
                    name: 'Hospital Number',
                    type: 'text'
                },
                medicalHistoryField: {
                    name: 'Medical History',
                    type: 'text'
                },
                locationBay: {
                    name: 'Location Bay',
                    type: 'number'
                },
                locationBed: {
                    name: 'Location Bed',
                    type: 'number'
                },
                locationWard: {
                    name: 'Location Ward',
                    type: 'text'
                }
            },
        };
    }

    submit() {
      const {form} = this.state;
      for (let field in form) {
        let fieldObject = form[field];
        console.log(fieldObject.ref.value);

        if (!fieldObject.ref.value) {
          this.setState({
            status: `You have to enter a ${fieldObject.name} for the patient!`
          });
          return;
        }
      }
      const patient = {
        FirstName: form.firstNameField.ref.value,
        LastName: form.lastNameField.ref.value,
        DateOfBirth: form.dobField.ref.value,
        Gender: form.gender.ref.value,
        HospitalNumber: form.hospitalNumberField.ref.value,
        MedicalHistory: form.medicalHistoryField.ref.value,
        LocationBay: form.locationBay.ref.value,
        LocationBed: form.locationBed.ref.value,
        LocationWard: form.locationWard.ref.value
      };
      ApiClient.postPatient(patient).then(
        result => this.setState({status: 'Patient added successfully!'}),
        error => this.setState({status: 'Error: ' + error.message})
      )
    }

    generateForm() {
        const { form } = this.state;
        const forms = [];
        for (let field in form) {
            let fieldObject = form[field];
            forms.push(this.generateInput(fieldObject))
        }
        return forms;
    }

    generateInput(field) {
        return (<div>
            {field.name}
            <input type={field.type} onChange={() => this.updateInputValue} ref={(el) => field.ref = el} />
        </div>)
    }

    render() {
        const { form } = this.state;
        return (
            <div>
                {this.generateForm()}
                <input type='submit' onClick={() => this.submit()} />
                <div>
                    {this.state.status ? this.state.status : null}
                </div>
            </div>);
    }
}
