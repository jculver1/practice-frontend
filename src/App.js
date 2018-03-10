import React, { Component } from 'react';
import ShareList from './components/ShareList'
import logo from './logo.svg';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shares: [
        {text: "a"},
        {text: "b"},
        {text: "c"}
      ]
    }
  }

  componentDidMount() {
    console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL)
    fetch(process.env.REACT_APP_API_URL + "/shares")
    .then(results => {
      console.log("results",results)
      return results.json();
    }).then(data => {
      this.setState({
        shares: data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <ShareList shares={this.state.shares}></ShareList>
      </div>
    );
  }
}
