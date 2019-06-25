import React from 'react';
import './App.css';
import Input from './Input';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <header >
          <div className="header">
            <h4>Welcome to Recipe Finder! </h4>
            <img src="logo_clear.png" alt="Find Recipe Logo" height="15%"/>
          </div>
        </header>
      </div>
      
      <body className="App-body">
        <div className="description"> 
          <p>Pick a cuisine (or leave it as any) and up to 3 ingredients to cook with.<br /> Recipe Finder will find you something to cook!</p>
        </div>
        <Input></Input>
        </body>
    </div>
  );
}

export default App;
