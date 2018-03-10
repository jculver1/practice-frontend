import React, { Component } from 'react';

export default class AddShareForm extends Component {

  constructor(props) {
    super(props)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.addShare({text: this.refs.title.value})
    this.refs.title.value = ""
  }

  render() {
    return (
      <form className="well" onSubmit={this.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" ref="title" id="title" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <button className="btn btn-success">Add Task</button>
        </fieldset>
      </form>
    )
  }

}

AddShareForm.defaultProps = {
  onSubmit() {}
}
