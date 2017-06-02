/*
    display data to the UI and handle form submissions
    - export default: export single value from module
    - named exports: export muliple named values
*/

//  jQuery for DOM manipulation
import $ from 'jquery';
import md5 from 'crypto-js/md5'; // Import just the submodule
import moment from 'moment';

// Helper for generating hash identifier
function createGravatarURL(username) {
    let userHash = md5(username);
    // ES6 template strings feature (backticks)
    return `http://www.gravatar.com/avatar/${userHash.toString()}`;
}

// DOM interacts with UI, prompt user for username
export function promptForUsername() {
    let username = prompt('Enter your username');
    return username.toLowerCase();
}

// Prompt for chat room
export function promptForChatRoom(rooms) {
    let chatroom = prompt('Choose a room: ' + rooms);
    return chatroom;
}

// Chatform constructor for accepting selctors (client sending out messages)
export class ChatForm {
    constructor(formSelector, inputSelector) {
        this.$form = $(formSelector);
        this.$input = $(inputSelector);
    }

    // Initialize with callback from form submit event
    // Handle form submissions from UI through ws-client (socket client side)
    init(submitCallback) {
        this.$form.submit((event) => {
            event.preventDefault();
            // Retrieve value from inputfield
            let val = this.$input.val();
            // Pass value to submitcallback
            submitCallback(val);
            this.$input.val('');
        });
        // Add click handler to fire submit event (single expression arrow)
        this.$form.find('button').on('click', () => this.$form.submit());
    }
}

// Events related to the navbar
export class ChatBar {
    constructor(roomsLinkSelector) {
        let items = document.querySelectorAll(roomsLinkSelector);
        this.$roomItems = [].slice.call(items);
    }
    // Listen to dropwdown click events
    init(clickCallback) {
        this.$roomItems.forEach((item) => {
            item.addEventListener('click', () => {
                let room = item.getAttribute('data-chat-room');
                clickCallback(room);
            });
        });
    }
}

// Create DOM elements for each message
export class ChatList {
    constructor(listSelector, userName) {
        // Know where to attach message list elements
        this.$list = $(listSelector);
        // Know which message sent by user and everybody else
        this.username = userName;
    }

    // Create a row for message with message contents / data
    drawMessage({user: u, timestamp: t, message: m}) {
        let $messageRow = $('<li>', {
            'class': 'message-row'
        });

        let $bubble = $('<div>', {
            'class': 'message-bubble'
        });

        // If you are sender of message, extra styling
        if (this.username === u) {
            $messageRow.addClass('row-me');
            $bubble.addClass('bubble-me');
        }

        // Construct DOM message elements
        let $message = $('<p>');
        $message.append($('<span>', {
            'class': 'message-username',
            text: u
        }));
        $message.append($('<span>', {
            'class': 'timestamp',
            'data-time': t,
            text: moment(t).fromNow()
        }));
        $message.append($('<span>', {
            'class': 'message-message',
            text: m
        }));

        let $img = $('<img>', {
            src: createGravatarURL(u),
            title: u
        });

        // Append messageRow to list element
        $messageRow.append($img);
        $bubble.append($message);
        $messageRow.append($bubble);
        this.$list.append($messageRow);

        // Scrolls row into visible window area
        $messageRow.get(0).scrollIntoView();
    }

    // Call setInterval and set timestamp string
    init() {
        this.timer = setInterval(() => {
            // Find all elements with data-time attribute
            $('[data-time]').each((idx, element) => {
                let $element = $(element);
                // Create new date object with timestamp
                let timestamp = new Date().setTime($element.attr('data-time'));
                // Produce final timestamp string
                let ago = moment(timestamp).fromNow();
                $element.html(ago);
            });
        }, 1000); // Run every 1000 miliseconds
    }
}
