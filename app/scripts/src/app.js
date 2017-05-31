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
import { UserStore } from './storage';
import { ChatForm, ChatList, promptForUsername, promptForChatRoom } from './dom'; // {named import}

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

// Check if username in session storage of browser
let userStore = new UserStore('x-chatApp/u');
let username = userStore.get();
if (!username) {
    username = promptForUsername();
    userStore.set(username);
}

// Rooms
let availableRooms = [];
let chosenRoom;


// ES6 class (constructor sorthand syntax)
class ChatApp {
    constructor() {
        // Properties
        this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
        this.chatList = new ChatList(LIST_SELECTOR, username)

        socket.init('ws://localhost:3001');
        // Open socket connection to server
        socket.registerOpenHandler(() => {
            // Initialize ChatForm instance with form submission callback
            this.chatForm.init((text) => {
                let message = new ChatMessage({ message: text });
                socket.sendMessage(message.serialize());
            });
            this.chatList.init(); // Generate readable timestamp
        });
        // Forwarded message
        socket.registerMessageHandler((data) => {
            if (!chosenRoom) {
                // Server message
                configureRoom(data);
            } else {
                // User message
                let message = new ChatMessage(data);
                this.chatList.drawMessage(message.serialize());
            }
        });
    }
}
function configureRoom(data) {
    chosenRoom = promptForChatRoom(data);
    let message = new ChatMessage({ message: 'initUserRoom', admin: true });
    socket.sendMessage(message.serialize());
}

// Add username etc to message before sending to server
class ChatMessage {
    constructor({
        message: m,
        user: u = username,
        timestamp: t = (new Date()).getTime(),
        room: r = chosenRoom,
        admin: a = false
    }) {
        this.message = m;
        this.user = u;
        this.timestamp = t;
        this.room = r;
        this.admin = a;
    }

    // represent the data as a plain JavaScript object for socket stream.
    serialize() {
        return { // JSON object
            user: this.user,
            message: this.message,
            timestamp: this.timestamp,
            room: this.room,
            admin: this.admin
        };
    }
}

// In ES6 modules, you must explicitly export the pieces
export default ChatApp;
