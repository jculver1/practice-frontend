import React, { Component } from 'react';
import '../App.css';

export default class Home extends Component {

  render() {
    return (
        <div>
            {this.props.isLoggedIn ?
                <div>  
                    <h1>"Welcome!"</h1>
                    <button className="btn btn-success" onClick={(e) => this.props.setLogin(e, false)}>Logout</button>
                </div>
                : ""
            }
        </div>
    )
  }

}




