import React, { Component } from 'react';
import ShareList from './components/ShareList'
import AddShareForm from './components/AddShareForm'
import LoginForm from './components/LoginForm'
import logo from './logo.svg';
import './App.css';

const REACT_APP_API_URL = "http://localhost:3001/"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shares: [
        {text: "a"},
        {text: "b"},
        {text: "c"}
      ],
      isLoggedIn: localStorage.jwt ? true : false,      
    }
  }

  componentDidMount() {
    fetch(REACT_APP_API_URL + "shares")
    .then(results => results.json())
    .then(data => {
      this.setState({
        shares: data
      })
    })
  }

  addShare = (share) => {
    let fakeShare = {userId: 2, ...share}
    fetch(REACT_APP_API_URL + "shares", {
      method: 'POST',
      body: JSON.stringify(fakeShare),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      this.setState({
          shares: this.state.shares.concat(share)
      })
    })
  }

  setLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  render() {
    return (
      <div className="App">
        <ShareList shares={this.state.shares} isLoggedIn={this.state.isLoggedIn}></ShareList>
        <AddShareForm addShare={this.addShare} isLoggedIn={this.state.isLoggedIn}></AddShareForm>
        <LoginForm setLogin={this.setLogin} isLoggedIn={this.state.isLoggedIn}></LoginForm>
      </div>
    );
  }
}
