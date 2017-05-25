/*
    display data to the UI and handle form submissions
    - export default: export single value from module
    - named exports: export muliple named values
*/

//  jQuery for DOM manipulation
import $ from 'jquery';

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

        // If you are sender of message, extra styling
        if (this.username === u) {
            $messageRow.addClass('me');
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
            text: (new Date(t)).getTime()
        }));
        $message.append($('<span>', {
            'class': 'message-message',
            text: m
        }));

        // Append messageRow to list element
        $messageRow.append($message);
        this.$list.append($messageRow);

        // Scrolls row into visible window area
        $messageRow.get(0).scrollIntoView();
    }
}
