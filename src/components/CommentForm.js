import React, { Component } from 'react'

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = { text: '' }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.text.trim()

    if (!text) {
      return
    }
    this.props.onCommentSubmit({ text: text, createdOn: Date.now() })
    this.setState({ text: '' })
  }
  render() {
    return (
      <form className="fixed-bottom bg-dark text-white px-3 py-2" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input type="text"
            className="form-control"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary">Send</button>
          </div>
        </div>
      </form>
    )
  }
}

export default CommentForm
