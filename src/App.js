import React from 'react';
import logo from './logo.svg';
import './App.css';

import TestComponent from './TestComponent'

function App() {
  return (
    <div className="App">
      <div>Cluster Status</div>
      <header className="App-header">
        <TestComponent />
      </header>
    </div>
  );
}

export default App;
