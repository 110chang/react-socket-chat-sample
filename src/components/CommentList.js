import React, { Component } from 'react'
import CommentItem from './CommentItem'

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

export default CommentList
