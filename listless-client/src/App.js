import React, { Component } from 'react';
import ViewPatients from "./components/ViewPatients";

import './App.css';
import AddPatient from "./components/AddPatient";
import AddJob from './components/AddJobModal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ListLess</h1>
        </header>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">View Patients</Link>
              </li>
              <li>
                <Link to="/addPatient">Add Patient</Link>
              </li>
              <li>
              <Link to="/addJob">Add Job</Link>
                </li>
            </ul>
            <Route exact path="/" component={ViewPatients}/>
            <Route path="/addPatient" component={AddPatient}/>
            <Route path="/addJob" component={AddJob}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
