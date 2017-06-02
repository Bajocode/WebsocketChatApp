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
    1: {users: [], history: []},
    2: {users: [], history: []},
    3: {users: [], history: []},
};


// Callback for every conneciton event on ws server
// Access client connection through socket object
ws.on('connection', (socket) => {
    // User is now in the lobby, send available rooms
    let roomInfoResponse = JSON.stringify(Object.keys(rooms));
    socket.send(roomInfoResponse);

    // Handle received message from socket
    socket.on('message', (data) => {
        // Get attached room for received message
        let jsonMessage = JSON.parse(data);
        let room = rooms[jsonMessage.room];

        // Process initial admin message as user registration
        if (jsonMessage.admin) {
            // Add user to chosen room
            let user = {userName: jsonMessage.user, socket: socket};
            room.users.push(user);
            console.log('Server submits connection: ' + jsonMessage.userName + ' added to room ' + jsonMessage.room);
            // Send room chat history to newly connected user
            room.history.forEach((msg) => {
                socket.send(JSON.stringify(msg));
            });
        } else {
            // Normal message, update room history
            room.history.push(jsonMessage);
            // Broadcast message to each socket in users room
            var roomSockets = [];
            room.users.forEach((user) => {
                roomSockets.push(user.socket);
            });
            roomSockets.forEach((clientSocket) => {
                clientSocket.send(data);
            });
        }
    });
});
