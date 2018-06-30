import React from 'react';
import InputField from './InputField';

export default class AddPatientComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {
                nameField: {
                    name: 'Name',
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
                locationField: {
                    name: 'Location',
                    type: 'text'
                }
            },
        };
    }

    checkForm() {
        const { form } = this.state;
        for (let field in form) {
            let fieldObject = form[field]
            console.log(fieldObject.ref.value)

            if (!fieldObject.ref.value) {
                this.setState({
                    error: `You have to enter a ${fieldObject.name} for the patient!`
                })
                return;
            }
        }
        this.setState({error: null})
    }

generateForm(){
const {form} = this.state
    const forms = [];
    for (let field in form) {
        let fieldObject = form[field]
        forms.push(this.generateInput(fieldObject))
    }
    return forms;
}

generateInput(field){
    return (<div>
        {field.name}
        <input type={field.type}  onChange={() => this.updateInputValue} ref={(el) => field.ref = el}/>
    </div>)
}

    render() {
        const { form } = this.state;
        return (
            <div>
                {this.generateForm()}
                <input type='submit' onClick={() => this.checkForm()} />
                <div>
                    {this.state.error ? this.state.error : null}
                </div>
            </div>);
    }
}