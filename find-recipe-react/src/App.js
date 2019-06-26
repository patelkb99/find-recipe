import React from 'react';
import './App.css';
import Input from './Input';
import 'flag-icon-css/css/flag-icon.css'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <header >
            <h4>Welcome to Recipe Finder! </h4>
            <img src="logo_clear.png" alt="Find Recipe Logo" height="15%"/>
        </header>
      </div>
      
      <div className="App-body">
        <p id="description">Pick a cuisine (or leave it as any) and up to 3 ingredients to cook with.<br /> Recipe Finder will find you something to cook!</p>
        <Input></Input>
      </div>
    </div>
  );
}

export default App;
