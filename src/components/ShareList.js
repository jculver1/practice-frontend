import React, { Component } from 'react';
import Share from './Share'

export default class ShareList extends Component {

  renderCards() {
    return this.props.shares.map((share, index) => {
      return <Share key={index} text={share.text}></Share>
    })
  }

  render() {
    return (
      <div className="card-list">
        <ul>
          {this.renderCards()}
        </ul>
      </div>
    )
  }

}
