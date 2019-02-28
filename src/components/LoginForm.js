import React, { Component } from 'react';
import '../App.css';

export default class LoginForm extends Component {

  postData = (url = ``, data = {}) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
  }

  onLogin = (e) => {
    e.preventDefault()
    this.postData(`http://localhost:3001/auth/login`, {username: this.refs.username.value, password: this.refs.password.value})
    .then(data => { 
      console.log(JSON.stringify(data))
      localStorage.jwt = JSON.stringify(data.jwt)      
      this.props.setLogin()
    })
    .catch(error => console.error(error))
  }

  onCreate = (e) => {
    e.preventDefault()
    this.postData(`http://localhost:3001/auth/create`, {username: this.refs.username.value, password: this.refs.password.value})
    .then(data => {
      console.log(JSON.stringify(data))
      localStorage.jwt = JSON.stringify(data.jwt)
      this.props.setLogin()
    })
    .catch(error => console.error(error))
  }

  render() {
    return (
      <form className={this.props.isLoggedIn ? "hidden" : "displayed"}>
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

LoginForm.defaultProps = {
  onSubmit() {}
}
