//main.js

var React = require('react');
var ReactDOM = require('react-dom');

var io = require('socket.io-client');

var socket = io();
var uid = -1;
var color = '#000';

var CommentBox = React.createClass({
  handleCommentReceive: function(comment) {
    console.log(comment);
    this.setState({ data: this.state.data.concat([comment]) })
  },
  handleCommentSubmit: function(comment) {
    if (comment.text != null && comment.text !== '') {
      socket.emit('chat message', comment.text, uid, comment.createdOn, color);
    }
  },
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    socket.on('chat login', function(settings){
      console.log(settings.userColor)
      uid = settings.userId;
      color = settings.userColor;
    });

    var self = this;

    socket.on('chat message', function(msg){
      self.handleCommentReceive(msg);
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>React / socket.io chat sample</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <CommentItem commentType={comment.type} commentColor={comment.color} createdOn={comment.createdOn} key={comment._id}>
          {comment.text}
        </CommentItem>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return { text: '' };
  },
  handleTextChange: function(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();

    if (!text) {
      return;
    }
    this.props.onCommentSubmit({ text: text, createdOn: Date.now() });
    this.setState({ text: '' });
  },
  render: function() {
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
    );
  }
});

var CommentItem = React.createClass({
  render: function() {
    var createdOn = new Date();
    var commentType = 'commentType' + this.props.commentType.replace(/(^.)(.+)/, function(match, p1, p2) {
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
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
