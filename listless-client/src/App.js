import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiClient from "./services/ApiClient";
import ViewJobs from './components/ViewJobs'

class App extends Component {

  constructor() {
    super();
    this.state = {patientsList: [], error: undefined};
  }

  componentDidMount() {
    this.updatePatientsList();
  }

  render() {
    const fakeJobs = [
      {
    Name: 'Bloods',
    Status: 1,
    ID: 1
  },
  {
    Name: 'X ray',
    Status: 2,
    ID: 1
  },
  {
    Name: 'Physio',
    Status: 3,
    ID: 1
  }
    ];
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
        <ViewJobs jobs={fakeJobs} />
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
