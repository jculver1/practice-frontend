import React, { Component } from 'react';
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.jwt ? true : false,
      isErrorDisplayed: false,
      hiddenData: ""
    }
  }

  displayError = (value) => {
    this.setState({
      isErrorDisplayed: value
    })
  }

  setLogin = (value) => {
    const loggingOut = this.state.isLoggedIn && !value
    let hiddenData = this.state.hiddenData
    if (loggingOut) {
      localStorage.removeItem('jwt')
      hiddenData = ""
    }
    this.setState({
      isLoggedIn: value,
      isErrorDisplayed: false,
      hiddenData: hiddenData
    })
  }

  fetchHiddenData = () => {
    fetch(`http://localhost:3001/hidden`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + localStorage.jwt
        }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        hiddenData: data.message.user.email
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  render() {
    return (
      <div className="App">
        <Home setLogin={this.setLogin} isLoggedIn={this.state.isLoggedIn} fetchHiddenData={this.fetchHiddenData} hiddenData={this.state.hiddenData}></Home>
        <LoginForm setLogin={this.setLogin} isLoggedIn={this.state.isLoggedIn} displayError={this.displayError} isErrorDisplayed={this.state.isErrorDisplayed}></LoginForm>
      </div>
    );
  }
}
