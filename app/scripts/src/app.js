/*
    define the structure of messages and pass messages between and dom
*/
import socket from './ws-client';

// ES6 class (constructor sorthand syntax)
class ChatApp {
    constructor() {
        socket.init('ws://localhost:3001');
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

// (old) New instance
// new ChatApp();

// In ES6 modules, you must explicitly export the pieces of your module you
// want others to use
export default ChatApp;
