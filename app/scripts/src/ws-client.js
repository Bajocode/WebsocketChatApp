/*
    - manage the WebSockets communication for the client
    - communicating with your Node WebSocket server.
*/

// connecting to the server
let socket;
function init(url) {
    socket = new WebSocket(url);
    console.log('Connecting..');
}

// performing initial setup when the connection is first opened


// forwarding incoming messages to their handlers


// sending outgoing messages


export default {
    init,
}
