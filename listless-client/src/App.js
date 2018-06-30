import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiClient from "./services/ApiClient";

class App extends Component {

  constructor() {
    super();
    this.state = {patientsList: [], error: undefined};
  }

  componentDidMount() {
    this.updatePatientsList();
  }

  render() {
    return (
      <div className="App">
        {this.state.error &&
        <div className="Error-header">
          Error: {this.state.error.toString()}
        </div>
        }
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {this.state.patientsList.map(patient => patient.LastName).join(', ')}
        </p>
      </div>
    );
  }

  updatePatientsList() {
    ApiClient
      .getPatientsList()
      .then(
        patientsList => this.setState({patientsList: patientsList, error: undefined}),
        error => this.setState({error: error.message})
      )
  }
}

export default App;
