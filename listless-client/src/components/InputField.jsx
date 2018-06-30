import React from 'react';

export default class InputField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

updateInputValue(event){
    this.setState({
        value: event.target.value
    })
}

    render() {
        const { field } = this.props;

        return (<div>
            {field.name}
            <input type={field.type}  onChange={() => this.updateInputValue}/>
        </div>
        )
    }
}