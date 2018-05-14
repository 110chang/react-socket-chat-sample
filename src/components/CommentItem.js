import React, { Component } from 'react'

class CommentItem extends Component {
  render() {
    const { children, createdOn, commentType, commentColor } = this.props
    const createdDate = new Date()
    const classNames = 'my-2 commentItem commentType' + commentType.replace(/(^.)(.+)/, (match, p1, p2) => {
      return p1.toUpperCase() + p2
    })
    createdDate.setTime(createdOn)
    return (
      <div className={classNames}>
        <p className="lead mb-0" style={{color: commentColor}}>
          {children}
        </p>
        <time className="text-muted commentCreatedOn">
          {createdDate.toUTCString()}
        </time>
      </div>
    )
  }
}

export default CommentItem
