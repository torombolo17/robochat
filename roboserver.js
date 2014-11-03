/*
// Variable port setting for heroku

var port = process.env.PORT || 3000;

var app = require('express').createServer()
var io = require('socket.io').listen(app);

app.listen(port);

// Heroku setting for long polling - assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/roboclient.html');
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

*/




// Variable port setting for heroku

var port = process.env.PORT || 3000;

var app = require('express').createServer();
var io = require('socket.io').listen(app);

app.listen(port);

// Heroku setting for long polling - assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/roboclient.html');
});

// usernames which are currently connected to the chat
var usernames = {};

io.sockets.on('connection', function (socket) {

    console.log('a user connected');


    socket.on('disconnect', function(){
      console.log('user disconnected');
    });


    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.sockets.emit('chat message', msg);
    });

  
});








