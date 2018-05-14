import React, { Component } from 'react'
import io from 'socket.io-client'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

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
      <div className="container">
        <h1 className="display-4">React / socket.io chat sample</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}

export default CommentBox
