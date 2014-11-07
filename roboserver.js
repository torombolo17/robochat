// Variable port setting for heroku

var port = process.env.PORT || 3000;

var fb = document.createElemnt('script');
fb.src = 'http://cdn.firebase.com/js/client/1.1.1/firebase.js';
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

    socket.on('adduser', function(username){
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        console.log(usernames[username] + " has connected");
    });


    socket.on('disconnect', function(){
      console.log('user disconnected');
    });


    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.sockets.emit('chat message', msg);
    });

  
});








