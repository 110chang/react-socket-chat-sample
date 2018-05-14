//index.js

var Color = require('color');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var socketio = require('socket.io');

var io = socketio(http);

var uid = 0;
var commentId = 0;
var users = [];
var color = Color('#F00');

app.use(express.static('dist'));

io.on('connection', function(socket){
  console.log('user connected', socket.id);

  io.to(socket.id).emit('chat login', {
    userId: ++uid,
    userColor: color.rotate(30).clone().darken(0.3).hexString()
  });

  io.to(socket.id).emit('chat message', {
    type: 'system',
    color: '#666',
    text: '#sys ' + uid + '番さんこんにちは！',
    _id: commentId++,
    createdOn: Date.now()
  });

  socket.broadcast.emit('chat message', {
    type: 'system',
    color: '#666',
    text: '#' + uid + '番さんが入室しました',
    _id: commentId++,
    createdOn: Date.now()
  });
  users[socket.id] = uid;

  socket.on('chat message', function(msg, id, date, color){
    console.log('receive msg ', msg);
    io.emit('chat message', {
      type: 'user',
      color: color,
      text: '#' + id + ' : ' + msg,
      _id: commentId++,
      createdOn: date
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected', socket.id);
    io.emit('chat message', {
      type: 'system',
      color: '#666',
      text: '#sys ' + users[socket.id] + '番さんが退室しました',
      _id: commentId++,
      createdOn: Date.now()
    });
  });
});

http.listen(3000, function() {
  console.log('listen *:3000');
});
