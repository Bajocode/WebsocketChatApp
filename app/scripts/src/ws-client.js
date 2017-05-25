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
function registerOpenHandler(handlerFunction) {
    socket.onopen = () => {
        console.log('open');
        handlerFunction();
    };
}

// forwarding incoming messages to their handlers
function registerMessageHandler(handlerFunction) {
    socket.onmessage = (e) => {
        console.log('message', e.data);
        let data = JSON.parse(e.data);
        handlerFunction(data);
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
