import React from 'react';
import logo from './logo.svg';
import './App.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bootstrapped using <code>Springboard</code>
        </p>
        <a
          className="App-link"
          href="https://github.com/srm-kzilla/springboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Star the repo. Show the love.
        </a>
      </header>
    </div>
  );
}

export default App;
