import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar/>
        <ShoppingList />
      </div>
    );
  }
}

export default App;
