/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



//var io = require('socket.io');
var server = http.createServer();
server.listen(port, ipAddress);
var socket = io.listen(server);


app.get('/', function(req, res){
  res.render('roboclient', {layout: false});
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

/*http.listen(3000, function(){
  console.log('listening on *:3000');
});*/



//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//var server = http.createServer();
//server.listen(port, ipAddress);
//var socket = io.listen(server);

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

//app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/roboclient.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading roboclient.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

//http.listen(3000, function(){
//  console.log('listening on *:3000');
//});

/*app.get('/', function(req, res){
  res.sendFile(__dirname +'index.html');
});
*/

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








