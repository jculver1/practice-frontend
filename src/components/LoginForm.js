import React, { Component } from 'react';
import '../App.css';

export default class LoginForm extends Component {

  postData = (route) => {
    fetch(`http://localhost:3001/auth/${route}`, {
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
        localStorage.setItem('jwt', data.jwt)      
        this.props.setLogin(true)
      } else {
        this.props.setLogin(false)
      }
      this.props.displayError(false)
    })
    .catch(error => {
      console.error(error)
      this.props.setLogin(false)
      this.props.displayError(true)
    })
  }

  render() {
    return (
      <div>
        <h1>{!this.props.isLoggedIn && "Please create an account or login."}</h1> 
        <form className={this.props.isLoggedIn ? "hidden" : "displayed"} onSubmit={(e) => e.preventDefault()}>
          <fieldset className="form-group">
            <label htmlFor="username">Username</label>
            <input type="email" ref="username" id="username" className="form-control" required/>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" ref="password" id="password" className="form-control" required/>
          </fieldset>
          <fieldset className="form-group">
            <button className="btn btn-success" onClick={(e) => this.postData("login")}>Login</button>
            <button className="btn btn-success" onClick={(e) => this.postData("create")}>Create User</button>
          </fieldset>
          <h2>{this.props.isErrorDisplayed && "Please try again"}</h2>
        </form>
      </div>
    )
  }

}