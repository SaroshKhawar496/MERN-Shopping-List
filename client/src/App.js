import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './components/AppNavBar'
import ShoppingList from './components/ShoppingList';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <AppNavBar/>
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
