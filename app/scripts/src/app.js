/*
    define the structure of messages and pass messages between and dom
*/
import socket from './ws-client';

// ES6 class (constructor sorthand syntax)
class ChatApp {
    constructor() {
        socket.init('ws://localhost:3001');
        // When connected, send pow!
        socket.registerOpenHandler(() => {
            let message = new ChatMessage({ message: 'pow!'});
            socket.sendMessage(message.serialize());
        });
        // Forwarded message
        socket.registerMessageHandler((data) => {
            console.log(data);
        });
    }
}

// Add username etc to message before sending to server
class ChatMessage {
    constructor({
        message: m,
        user: u = 'wonderwoman',
        timestamp: t = (new Date()).getTime()
    }) {
        this.message = m;
        this.user = u;
        this.timestamp = t;
    }
    // represent the data as a plain JavaScript object for socket stream.
    serialize() {
        return { // JSON object
            user: this.user,
            message: this.message,
            timestamp: this.timestamp
        };
    }
}

// In ES6 modules, you must explicitly export the pieces 
export default ChatApp;
