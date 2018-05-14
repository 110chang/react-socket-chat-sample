import React, { Component } from 'react'

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

export default CommentItem
