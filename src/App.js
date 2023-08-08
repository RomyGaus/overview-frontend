import React, { Component } from 'react';
import List from './components/list/List.js';
import './App.css';

class App extends Component {
  render() {
    return(
      <div className='container'>
        <div className='header'>
          <h1>Overview</h1>
          <h4>Organize your supplies and find out what you need to buy soon!</h4>
        </div>
        <button className='btn-shopping'>Shopping List</button>
        <List></List>
      </div>
    )
  }
}

export default App;
