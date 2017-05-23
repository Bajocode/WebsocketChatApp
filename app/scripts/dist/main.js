(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require('./ws-client');

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                              define the structure of messages and pass messages between and dom
                                                                                                                                                          */


// ES6 class (constructor sorthand syntax)
var ChatApp = function ChatApp() {
    _classCallCheck(this, ChatApp);

    _wsClient2.default.init('ws://localhost:3001');
};

// Add username etc to message before sending to server


var ChatMessage = function () {
    function ChatMessage(_ref) {
        var m = _ref.message,
            _ref$user = _ref.user,
            u = _ref$user === undefined ? 'wonderwoman' : _ref$user,
            _ref$timestamp = _ref.timestamp,
            t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

        _classCallCheck(this, ChatMessage);

        this.message = m;
        this.user = u;
        this.timestamp = t;
    }
    // represent the data as a plain JavaScript object for socket stream.


    _createClass(ChatMessage, [{
        key: 'serialize',
        value: function serialize() {
            return { // JSON object
                user: this.user,
                message: this.message,
                timestamp: this.timestamp
            };
        }
    }]);

    return ChatMessage;
}();

// (old) New instance
// new ChatApp();

// In ES6 modules, you must explicitly export the pieces of your module you
// want others to use


exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default(); /*
                         Initializes the application
                     */

},{"./app":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
    - manage the WebSockets communication for the client
    - communicating with your Node WebSocket server.
*/

// connecting to the server
var socket = void 0;
function init(url) {
    socket = new WebSocket(url);
    console.log('Connecting..');
}

// performing initial setup when the connection is first opened


// forwarding incoming messages to their handlers


// sending outgoing messages


exports.default = {
    init: init
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNHQTs7Ozs7OzBKQUhBOzs7OztBQUtBO0lBQ00sTyxHQUNGLG1CQUFjO0FBQUE7O0FBQ1YsdUJBQU8sSUFBUCxDQUFZLHFCQUFaO0FBQ0gsQzs7QUFHTDs7O0lBQ00sVztBQUNGLCtCQUlHO0FBQUEsWUFIVSxDQUdWLFFBSEMsT0FHRDtBQUFBLDZCQUZDLElBRUQ7QUFBQSxZQUZPLENBRVAsNkJBRlcsYUFFWDtBQUFBLGtDQURDLFNBQ0Q7QUFBQSxZQURZLENBQ1osa0NBRGlCLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNoQjs7QUFBQTs7QUFDQyxhQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNIO0FBQ0Q7Ozs7O29DQUNZO0FBQ1IsbUJBQU8sRUFBRTtBQUNMLHNCQUFNLEtBQUssSUFEUjtBQUVILHlCQUFTLEtBQUssT0FGWDtBQUdILDJCQUFXLEtBQUs7QUFIYixhQUFQO0FBS0g7Ozs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTs7O2tCQUNlLE87Ozs7O0FDbENmOzs7Ozs7QUFDQSxvQixDQUxBOzs7Ozs7Ozs7O0FDQUE7Ozs7O0FBS0E7QUFDQSxJQUFJLGVBQUo7QUFDQSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsYUFBUyxJQUFJLFNBQUosQ0FBYyxHQUFkLENBQVQ7QUFDQSxZQUFRLEdBQVIsQ0FBWSxjQUFaO0FBQ0g7O0FBRUQ7OztBQUdBOzs7QUFHQTs7O2tCQUdlO0FBQ1g7QUFEVyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gICAgZGVmaW5lIHRoZSBzdHJ1Y3R1cmUgb2YgbWVzc2FnZXMgYW5kIHBhc3MgbWVzc2FnZXMgYmV0d2VlbiBhbmQgZG9tXG4qL1xuaW1wb3J0IHNvY2tldCBmcm9tICcuL3dzLWNsaWVudCc7XG5cbi8vIEVTNiBjbGFzcyAoY29uc3RydWN0b3Igc29ydGhhbmQgc3ludGF4KVxuY2xhc3MgQ2hhdEFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHNvY2tldC5pbml0KCd3czovL2xvY2FsaG9zdDozMDAxJyk7XG4gICAgfVxufVxuXG4vLyBBZGQgdXNlcm5hbWUgZXRjIHRvIG1lc3NhZ2UgYmVmb3JlIHNlbmRpbmcgdG8gc2VydmVyXG5jbGFzcyBDaGF0TWVzc2FnZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICBtZXNzYWdlOiBtLFxuICAgICAgICB1c2VyOiB1ID0gJ3dvbmRlcndvbWFuJyxcbiAgICAgICAgdGltZXN0YW1wOiB0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICAgIH0pIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbTtcbiAgICAgICAgdGhpcy51c2VyID0gdTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0O1xuICAgIH1cbiAgICAvLyByZXByZXNlbnQgdGhlIGRhdGEgYXMgYSBwbGFpbiBKYXZhU2NyaXB0IG9iamVjdCBmb3Igc29ja2V0IHN0cmVhbS5cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIHJldHVybiB7IC8vIEpTT04gb2JqZWN0XG4gICAgICAgICAgICB1c2VyOiB0aGlzLnVzZXIsXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRoaXMudGltZXN0YW1wXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vLyAob2xkKSBOZXcgaW5zdGFuY2Vcbi8vIG5ldyBDaGF0QXBwKCk7XG5cbi8vIEluIEVTNiBtb2R1bGVzLCB5b3UgbXVzdCBleHBsaWNpdGx5IGV4cG9ydCB0aGUgcGllY2VzIG9mIHlvdXIgbW9kdWxlIHlvdVxuLy8gd2FudCBvdGhlcnMgdG8gdXNlXG5leHBvcnQgZGVmYXVsdCBDaGF0QXBwO1xuIiwiLypcbiAgICBJbml0aWFsaXplcyB0aGUgYXBwbGljYXRpb25cbiovXG5cbmltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcbm5ldyBDaGF0QXBwKCk7XG4iLCIvKlxuICAgIC0gbWFuYWdlIHRoZSBXZWJTb2NrZXRzIGNvbW11bmljYXRpb24gZm9yIHRoZSBjbGllbnRcbiAgICAtIGNvbW11bmljYXRpbmcgd2l0aCB5b3VyIE5vZGUgV2ViU29ja2V0IHNlcnZlci5cbiovXG5cbi8vIGNvbm5lY3RpbmcgdG8gdGhlIHNlcnZlclxubGV0IHNvY2tldDtcbmZ1bmN0aW9uIGluaXQodXJsKSB7XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0aW5nLi4nKTtcbn1cblxuLy8gcGVyZm9ybWluZyBpbml0aWFsIHNldHVwIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZmlyc3Qgb3BlbmVkXG5cblxuLy8gZm9yd2FyZGluZyBpbmNvbWluZyBtZXNzYWdlcyB0byB0aGVpciBoYW5kbGVyc1xuXG5cbi8vIHNlbmRpbmcgb3V0Z29pbmcgbWVzc2FnZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdCxcbn1cbiJdfQ==
