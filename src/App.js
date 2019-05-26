import React from 'react';
import logo from './logo.svg';
import './App.css';

import TestComponent from './TestComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div>Cluster Status</div>
        <TestComponent />
      </header>
    </div>
  );
}

export default App;
