// Variable port setting for heroku

var port = process.env.PORT || 3000;

var app = require('express').createServer()
var io = require('socket.io').listen(app);
var unirest = require('unirest');
var Firebase = require('firebase');
var db = new Firebase('https://robochat0.firebaseio.com/');

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

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        url = "https://api.voicerss.org/?key=116c3dfac5c3487b94014be533051b0e&src="+data+"&hl=en-us"
        function httpGet(theUrl)
        {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            return xmlHttp.responseXML;
        }
        // var voice = unirest.get("https://api.voicerss.org/?key=116c3dfac5c3487b94014be533051b0e&src="+data+"&hl=en-us");

        // if(typeof(voice) !== 'undefined'){
        //     console.log("No es undefined");
        //     console.log(typeof(voice));
        //     console.log("Es aqui donde se imprime el objeto" + voice + "!!!!!!!!");
        // }else{
        //     console.log("Es undefined");
        // }

        // we tell the client to execute 'updatechat' with 2 parameters
        voice = httpGet(url)
        io.sockets.emit('updatechat', socket.username, data, voice);
        db.push({name: socket.username, message: data});
    });

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // we store the username in the socket session for this client
        socket.username = username;
        // add the client's username to the global list
        usernames[username] = username;
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected');
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
        // update the list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });
});