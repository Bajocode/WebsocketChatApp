# WebsocketChatApp
![Screenshot of the app](repomedia/Conversation.png)

A chat app experiment consisting of a Node.js server and a JavaScript app running in the browser.

## Configuration
1. Navigate to the project root directory
2. run `$ npm install`
3. Open a new browser page on http://localhost:3000/
4. Enter an email address as your chat username
    * Ideally an email address bound to a [Gravatar](https://en.gravatar.com/) account
5. Each new browser tab represents a new user, connecting to the same socket stream at `ws port 3001` (same chat room)

###### ToDo
* Add private chat rooms with multiple socket streams
* Add better styling, throw away bootstrap
* Add cool chat features found in popular apps, such as, Slack
