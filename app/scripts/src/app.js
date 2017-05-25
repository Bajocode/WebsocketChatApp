/*
    define the structure of messages and pass messages between and dom

    Flow: sending outgoing chat messages
    1. User submits message by typing and clicking on submit
    2. ChatForm instance takes the data and sends to chatApp's callback
    3. Callback will package it up as ChatMessage + send to WebSocket server
        - ws-client makes sure ChatMessage is processable for socket protocol

    FLow: display new messages from server
*/
import socket from './ws-client';
import { ChatForm, ChatList } from './dom'; // {named import}

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

// ES6 class (constructor sorthand syntax)
class ChatApp {
    constructor() {
        // Properties
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, 'FabijanBajo')

        socket.init('ws://localhost:3001');
        // Open socket connection to server
        socket.registerOpenHandler(() => {
            // Initialize ChatForm instance with form submission callback
            this.chatForm.init((text) => {
                let message = new ChatMessage({ message: text });
                socket.sendMessage(message.serialize());
            });
        });
        // Forwarded message
        socket.registerMessageHandler((data) => {
            let message = new ChatMessage(data);
            this.chatList.drawMessage(message.serialize());
            console.log(data);
        });
    }
}

// Add username etc to message before sending to server
class ChatMessage {
    constructor({
        message: m,
        user: u = 'FabijanBajo',
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
