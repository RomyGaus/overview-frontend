import React, { Component } from 'react';
import List from './components/list/List.js';
import ShoppingList from './components/shoppingList/ShoppingList.js';
import Header from './components/header/Header.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'overview',
    };
  }

  changeRoute = (destination) => {
    this.setState({
      route: destination
    })
  }

  render() {
    return(
      <div className='container'>
        <Header route={this.state.route} onRouteChange={this.changeRoute}></Header>
        {this.state.route === 'overview'
          ? <List></List>
          : <ShoppingList></ShoppingList>
        }
      </div>
    )
  }
}

export default App;
