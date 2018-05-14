import React, { Component } from 'react'
import CommentItem from './CommentItem'

const CommentList = ({ data }) => (
  <div className="commentList">
    {data.map((comment) => {
      return (
        <CommentItem key={comment._id}
          commentType={comment.type}
          commentColor={comment.color}
          createdOn={comment.createdOn}
        >
          {comment.text}
        </CommentItem>
      )
    })}
  </div>
)

export default CommentList
