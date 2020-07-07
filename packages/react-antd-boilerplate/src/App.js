import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><Button type="primary" size="large" shape="circle" className="button-transform">JCSB</Button></p>
        <a className="App-link" href="https://github.com/Cphayim/boilerplate/tree/dev_yugestrive/packages/react-antd-boilerplate" target="_blank" rel="noopener noreferrer">Learn React-Antd-Boilerplate</a>
      </header>
    </div>
  );
}

export default App;
