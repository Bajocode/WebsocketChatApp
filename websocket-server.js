// import websockets module and start listening
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
// Bind to port 3001
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];

// Callback for every conneciton event on ws server
// Access client connection through socket object
ws.on('connection', function(socket) {
    console.log('Client connection established');

    // Send old messages to newly connected client
    messages.forEach(function(msg) {
        socket.send(msg);
    });

    // Create echo server: repeat any msg sent to websocket server
    socket.on('message', function(data) {
        console.log('Message received: ' + data);
        // Add messages to history array
        messages.push(data);

        // Send new message form client to every client connected to socket
        ws.clients.forEach(function(clientSocket) {
            clientSocket.send(data)
        });
    });
});
