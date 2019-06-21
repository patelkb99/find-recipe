import React from 'react';
import './App.css';
import Input from './Input';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Recipe Finder!
      </header>
      <body className="App-body">
        <Input></Input>
        <Recipe></Recipe>
        </body>
    </div>
  );
}

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      recipe: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/recipes/random/?i=eggs,cheese&q=italian")
      .then(response => {
        return response.json();
      }).then(
        (result) => {
          this.setState({
            isLoaded: true,
            recipe: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, recipe } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
            <li key={recipe.title}>
              Recipe Name: {recipe.title}
            </li>
            <li key={recipe.href}>
              {recipe.href}
            </li>
            <li key={recipe.ingredients}>
              {recipe.ingredients}
            </li>
        </ul>
      );
    }
  }
}

export default App;
