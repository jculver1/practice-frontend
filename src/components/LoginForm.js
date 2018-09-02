import React, { Component } from 'react';
import './LoginForm.css';

export default class AddShareForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: localStorage.jwt || false,
    }
  }

  postData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
  }

  onLogin = (e) => {
    e.preventDefault();
    this.postData(`http://localhost:3001/auth/login`, {username: this.refs.username.value, password: this.refs.password.value})
    .then(data => { 
      console.log(JSON.stringify(data))
      localStorage.jwt = JSON.stringify(data.jwt)      
      this.setState(
        {isLoggedIn: true}
      )
    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  }

  onCreate = (e) => {
    e.preventDefault();
    this.postData(`http://localhost:3001/auth/create`, {username: this.refs.username.value, password: this.refs.password.value})
    .then(data => {
      console.log(JSON.stringify(data))
      localStorage.jwt = JSON.stringify(data.jwt)
      this.setState(
        {isLoggedIn: true}
      )      
    }) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
  }

  render() {
    return (
      <form className={this.state.isLoggedIn ? "hidden" : "displayed"}>
        <fieldset className="form-group">
          <label htmlFor="username">Username</label>
          <input type="email" ref="username" id="username" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" ref="password" id="password" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <button className="btn btn-success" onClick={this.onLogin}>Login</button>
        </fieldset>
        <fieldset className="form-group">
          <button className="btn btn-success" onClick={this.onCreate}>Create User</button>
        </fieldset>
      </form>
    )
  }

}

AddShareForm.defaultProps = {
  onSubmit() {}
}
