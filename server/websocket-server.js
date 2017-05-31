// import websockets module and start listening
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
// Bind to port 3001
var port = 3001;
var ws = new WebSocketServer({
    port: port
});

var rooms = {
    roomOne: {name: 'one', users: [], history: []},
    roomTwo: {name: 'two', users: [], history: []},
    roomThree: {name: 'three', users: [], history: []},
};


// Callback for every conneciton event on ws server
// Access client connection through socket object
ws.on('connection', (socket) => {
    // User is now in the lobby
    console.log('Client connection established');
    let roomInfoResponse = JSON.stringify(Object.keys(rooms));
    socket.send(roomInfoResponse);

    // Send old messages to newly connected client
    // messages.forEach((msg) => {
    //     socket.send(msg);
    // });

    // Create echo server: repeat any msg sent to websocket server
    socket.on('message', (data) => {
        // Get room for received message
        let jsonMessage = JSON.parse(data);
        let room = rooms[jsonMessage.room];

        // Process initial admin message as user registration
        if (jsonMessage.admin) {
            let user = {userName: jsonMessage.user, socket: socket};
            room.history.forEach((msg) => {
                socket.send(JSON.stringify(msg));
            });

            room.users.push(user);
        } else {
            // Send new message form client to every client connected to socket
            room.history.push(jsonMessage);
            var sockets = [];
            room.users.forEach((user) => {
                sockets.push(user.socket);
            });
            sockets.forEach((clientSocket) => {
                clientSocket.send(data)
            });
            // ws.clients.forEach((clientSocket) => {
            //     clientSocket.send(data)
            // });
        }

        // Add messages to history array
        //messages.push(data);
    });
});
