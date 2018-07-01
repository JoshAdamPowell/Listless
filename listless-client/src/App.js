import React, { Component } from 'react';
import ViewPatients from "./components/ViewPatients";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ListLess</h1>
        </header>
        <ViewPatients/>
      </div>
    );
  }
}

export default App;
