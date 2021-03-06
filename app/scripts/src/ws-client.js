/*
    - manage the WebSockets communication for the client
    - communicating with your Node WebSocket server from client.
*/

// connecting to the server
let socket;
function init(url) {
    socket = new WebSocket(url);
    console.log('Connecting..');
}

// performing initial setup when the connection is first opened
function registerOpenHandler(completion) {
    socket.onopen = () => {
        console.log('open');
        completion();
    };
}

// forwarding incoming messages to their handlers
function registerMessageHandler(completion) {
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        completion(data);
    };
}

// sending outgoing messages
function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

// add exports for methods using enhanced object literal syntax.
export default {
    init,
    registerOpenHandler,
    registerMessageHandler,
    sendMessage
}
