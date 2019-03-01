import React, { Component } from 'react';
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.jwt ? true : false,
      displayError: false
    }
  }

  setLogin = (e, success) => {
    this.setState({
      isLoggedIn: success,
      displayError: !success
    })
    if (this.state.isLoggedIn && !success) {
      localStorage.removeItem('jwt')
    }
  }

  render() {
    return (
      <div className="App">
        <Home setLogin={this.setLogin} isLoggedIn={this.state.isLoggedIn}></Home>
        <LoginForm setLogin={this.setLogin} isLoggedIn={this.state.isLoggedIn} displayError={this.state.displayError}></LoginForm>
      </div>
    );
  }
}
