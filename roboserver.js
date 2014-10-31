var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//var dir = "/Users/P3LL0/Google\ Drive/RoboChat/RoboChat\ Pello/";

http.listen(3000, function(){
  console.log('listening on *:3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname +'index.html');
});


io.on('connection', function(socket){
  console.log('a user connected');


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

});








