import React, { Component } from 'react';
import '../App.css';

export default class LoginForm extends Component {

  postData = (e, route) => {
    e.preventDefault()
    let url = `http://localhost:3001/auth/${route}`
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          username: this.refs.username.value, 
          password: this.refs.password.value
        }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.jwt) {
        localStorage.jwt = JSON.stringify(data.jwt)      
        this.props.setLogin(e, true)
      } else {
        throw new Error('jtw cannot be undefined'); 
      }
    })
    .catch(error => {
      console.error(error)
      this.props.setLogin(e, false)
    })
  }

  render() {
    return (
      <div>
        <h1>{!this.props.isLoggedIn && "Please create an account or login."}</h1> 
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
            <button className="btn btn-success" onClick={(e) => this.postData(e, "login")}>Login</button>
            <button className="btn btn-success" onClick={(e) => this.postData(e, "create")}>Create User</button>
          </fieldset>
          <h2>{this.props.displayError && "Bad login. Please try again"}</h2>
        </form>
      </div>
    )
  }

}