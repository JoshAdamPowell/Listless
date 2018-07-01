import React, { Component } from 'react';

import './PatientFilter.css';

export default class PatientFilter extends Component {

  render() {
    const { filterValue, options, onChange, title } = this.props;
    return (
        <div className="PatientFilter">
          <h2>{title}</h2>
          <select value={filterValue} onChange={event => onChange(event.target.value)}>
            <option value="">No filter</option>
            {options.map(option => <option value={option}>{option}</option>)}
          </select>
        </div>
    );
  }
}