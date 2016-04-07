//commentItem.js

import React from 'react'

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let createdOn = new Date();
    let commentType = 'commentType';

    commentType += this.props.commentType.replace(/(^.)(.+)/, (match, p1, p2) => {
      return p1.toUpperCase() + p2;
    });

    createdOn.setTime(this.props.createdOn);

    return (
      <div className={"commentItem " + commentType}>
        <p style={{color: this.props.commentColor}}>{this.props.children}</p>
        <time className="commentCreatedOn">{createdOn.toUTCString()}</time>
      </div>
    );
  }
}