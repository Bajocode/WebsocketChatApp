// import websockets module and start listening
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
// Bind to port 3001
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
// Chat rooms
var rooms = {
    roomOne: {name: 'one', users: [], history: []},
    roomTwo: {name: 'two', users: [], history: []},
    roomThree: {name: 'three', users: [], history: []},
};


// Callback for every conneciton event on ws server
// Access client connection through socket object
ws.on('connection', (socket) => {
    // User is now in the lobby, send available rooms
    console.log('Client connection established');
    let roomInfoResponse = JSON.stringify(Object.keys(rooms));
    socket.send(roomInfoResponse);

    // Handle received message from socket
    socket.on('message', (data) => {
        // Get room for received message
        let jsonMessage = JSON.parse(data);
        let room = rooms[jsonMessage.room];

        // Process initial admin message as user registration
        if (jsonMessage.admin) {
            // Add user to chosen room
            let user = {userName: jsonMessage.user, socket: socket};
            room.users.push(user);
            // Send room chat history to user
            room.history.forEach((msg) => {
                socket.send(JSON.stringify(msg));
            });
        } else {
            // Update room history
            room.history.push(jsonMessage);
            // Send message to each socket in users room
            var sockets = [];
            room.users.forEach((user) => {
                sockets.push(user.socket);
            });
            sockets.forEach((clientSocket) => {
                clientSocket.send(data);
            });
        }
    });
});
