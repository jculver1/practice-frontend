import React, { Component } from 'react';
import '../App.css';

const Home = (props) => {
  return (
      <div>
          {props.isLoggedIn ?
              <div>  
                  <h1>"Welcome!"</h1>
                  <button className="btn btn-success" onClick={(e) => props.fetchHiddenData(e)}>Fetch Hidden Data</button>
                  <button className="btn btn-success" onClick={(e) => props.setLogin(false)}>Logout</button>
                  <h2>{props.hiddenData}</h2>
              </div>
              : ""
          }
      </div>
  )
}

export default Home