//main.js

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import io from 'socket.io-client'

const socket = io()
let uid = -1
let color = '#000'

class CommentBox extends Component {
  constructor(props) {
    super(props)

    this.state = { data: [] }

    this.handleCommentReceive = this.handleCommentReceive.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }
  handleCommentReceive(comment) {
    console.log(comment)
    this.setState({ data: this.state.data.concat([comment]) })
  }
  handleCommentSubmit(comment) {
    if (comment.text != null && comment.text !== '') {
      socket.emit('chat message', comment.text, uid, comment.createdOn, color)
    }
  }
  componentDidMount() {
    socket.on('chat login', (settings) => {
      console.log(settings.userColor)
      uid = settings.userId
      color = settings.userColor
    })

    socket.on('chat message', (msg) => {
      this.handleCommentReceive(msg);
    })
  }
  render() {
    return (
      <div className="commentBox">
        <h1>React / socket.io chat sample</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

class CommentList extends Component {
  render() {
    return (
      <div className="commentList">
        {this.props.data.map((comment) => {
          return (
            <CommentItem commentType={comment.type} commentColor={comment.color} createdOn={comment.createdOn} key={comment._id}>
              {comment.text}
            </CommentItem>
          )
        })}
      </div>
    )
  }
}

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
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <button>Send</button>
      </form>
    )
  }
}

class CommentItem extends Component {
  render() {
    const createdOn = new Date();
    const commentType = 'commentType' + this.props.commentType.replace(/(^.)(.+)/, (match, p1, p2) => {
      return p1.toUpperCase() + p2
    })
    createdOn.setTime(this.props.createdOn);
    return (
      <div className={'commentItem ' + commentType}>
        <p style={{color: this.props.commentColor}}>{this.props.children}</p>
        <time className="commentCreatedOn">{createdOn.toUTCString()}</time>
      </div>
    )
  }
}

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
)
