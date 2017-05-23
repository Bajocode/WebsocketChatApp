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
    - communicating with your Node WebSocket server from client.
*/

// connecting to the server
var socket = void 0;
function init(url) {
    socket = new WebSocket(url);
    console.log('Connecting..');
}

// performing initial setup when the connection is first opened
function registerOpenHandler(handlerFunction) {
    socket.onopen = function () {
        console.log('open');
        handlerFunction();
    };
}

// forwarding incoming messages to their handlers
function registerMessageHandler(handlerFunction) {
    socket.onMessage = function (e) {
        console.log('message', e.data);
        var data = JSON.parse(e.data);
        handlerFunction(data);
    };
}

// sending outgoing messages
function sendMessage(payload) {
    socket.send(JSON.stringify(payload));
}

// add exports for methods using enhanced object literal syntax.
exports.default = {
    init: init,
    registerOpenHandler: registerOpenHandler,
    registerMessageHandler: registerMessageHandler,
    sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNHQTs7Ozs7OzBKQUhBOzs7OztBQUtBO0lBQ00sTyxHQUNGLG1CQUFjO0FBQUE7O0FBQ1YsdUJBQU8sSUFBUCxDQUFZLHFCQUFaO0FBQ0gsQzs7QUFHTDs7O0lBQ00sVztBQUNGLCtCQUlHO0FBQUEsWUFIVSxDQUdWLFFBSEMsT0FHRDtBQUFBLDZCQUZDLElBRUQ7QUFBQSxZQUZPLENBRVAsNkJBRlcsYUFFWDtBQUFBLGtDQURDLFNBQ0Q7QUFBQSxZQURZLENBQ1osa0NBRGlCLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNoQjs7QUFBQTs7QUFDQyxhQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNIO0FBQ0Q7Ozs7O29DQUNZO0FBQ1IsbUJBQU8sRUFBRTtBQUNMLHNCQUFNLEtBQUssSUFEUjtBQUVILHlCQUFTLEtBQUssT0FGWDtBQUdILDJCQUFXLEtBQUs7QUFIYixhQUFQO0FBS0g7Ozs7OztBQUdMO0FBQ0E7O0FBRUE7QUFDQTs7O2tCQUNlLE87Ozs7O0FDbENmOzs7Ozs7QUFDQSxvQixDQUxBOzs7Ozs7Ozs7O0FDQUE7Ozs7O0FBS0E7QUFDQSxJQUFJLGVBQUo7QUFDQSxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CO0FBQ2YsYUFBUyxJQUFJLFNBQUosQ0FBYyxHQUFkLENBQVQ7QUFDQSxZQUFRLEdBQVIsQ0FBWSxjQUFaO0FBQ0g7O0FBRUQ7QUFDQSxTQUFTLG1CQUFULENBQTZCLGVBQTdCLEVBQThDO0FBQzFDLFdBQU8sTUFBUCxHQUFnQixZQUFNO0FBQ2xCLGdCQUFRLEdBQVIsQ0FBWSxNQUFaO0FBQ0E7QUFDSCxLQUhEO0FBSUg7O0FBRUQ7QUFDQSxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWlEO0FBQzdDLFdBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTztBQUN0QixnQkFBUSxHQUFSLENBQVksU0FBWixFQUF1QixFQUFFLElBQXpCO0FBQ0EsWUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEVBQUUsSUFBYixDQUFYO0FBQ0Esd0JBQWdCLElBQWhCO0FBQ0gsS0FKRDtBQUtIOztBQUVEO0FBQ0EsU0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCO0FBQzFCLFdBQU8sSUFBUCxDQUFZLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBWjtBQUNIOztBQUVEO2tCQUNlO0FBQ1gsY0FEVztBQUVYLDRDQUZXO0FBR1gsa0RBSFc7QUFJWDtBQUpXLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAgICBkZWZpbmUgdGhlIHN0cnVjdHVyZSBvZiBtZXNzYWdlcyBhbmQgcGFzcyBtZXNzYWdlcyBiZXR3ZWVuIGFuZCBkb21cbiovXG5pbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcblxuLy8gRVM2IGNsYXNzIChjb25zdHJ1Y3RvciBzb3J0aGFuZCBzeW50YXgpXG5jbGFzcyBDaGF0QXBwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcbiAgICB9XG59XG5cbi8vIEFkZCB1c2VybmFtZSBldGMgdG8gbWVzc2FnZSBiZWZvcmUgc2VuZGluZyB0byBzZXJ2ZXJcbmNsYXNzIENoYXRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIG1lc3NhZ2U6IG0sXG4gICAgICAgIHVzZXI6IHUgPSAnd29uZGVyd29tYW4nLFxuICAgICAgICB0aW1lc3RhbXA6IHQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXG4gICAgfSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgICAgICB0aGlzLnVzZXIgPSB1O1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHQ7XG4gICAgfVxuICAgIC8vIHJlcHJlc2VudCB0aGUgZGF0YSBhcyBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0IGZvciBzb2NrZXQgc3RyZWFtLlxuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHsgLy8gSlNPTiBvYmplY3RcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIChvbGQpIE5ldyBpbnN0YW5jZVxuLy8gbmV3IENoYXRBcHAoKTtcblxuLy8gSW4gRVM2IG1vZHVsZXMsIHlvdSBtdXN0IGV4cGxpY2l0bHkgZXhwb3J0IHRoZSBwaWVjZXMgb2YgeW91ciBtb2R1bGUgeW91XG4vLyB3YW50IG90aGVycyB0byB1c2VcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG4iLCIvKlxuICAgIEluaXRpYWxpemVzIHRoZSBhcHBsaWNhdGlvblxuKi9cblxuaW1wb3J0IENoYXRBcHAgZnJvbSAnLi9hcHAnO1xubmV3IENoYXRBcHAoKTtcbiIsIi8qXG4gICAgLSBtYW5hZ2UgdGhlIFdlYlNvY2tldHMgY29tbXVuaWNhdGlvbiBmb3IgdGhlIGNsaWVudFxuICAgIC0gY29tbXVuaWNhdGluZyB3aXRoIHlvdXIgTm9kZSBXZWJTb2NrZXQgc2VydmVyIGZyb20gY2xpZW50LlxuKi9cblxuLy8gY29ubmVjdGluZyB0byB0aGUgc2VydmVyXG5sZXQgc29ja2V0O1xuZnVuY3Rpb24gaW5pdCh1cmwpIHtcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgY29uc29sZS5sb2coJ0Nvbm5lY3RpbmcuLicpO1xufVxuXG4vLyBwZXJmb3JtaW5nIGluaXRpYWwgc2V0dXAgd2hlbiB0aGUgY29ubmVjdGlvbiBpcyBmaXJzdCBvcGVuZWRcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gICAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ29wZW4nKTtcbiAgICAgICAgaGFuZGxlckZ1bmN0aW9uKCk7XG4gICAgfTtcbn1cblxuLy8gZm9yd2FyZGluZyBpbmNvbWluZyBtZXNzYWdlcyB0byB0aGVpciBoYW5kbGVyc1xuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pIHtcbiAgICBzb2NrZXQub25NZXNzYWdlID0gKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ21lc3NhZ2UnLCBlLmRhdGEpO1xuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcbiAgICAgICAgaGFuZGxlckZ1bmN0aW9uKGRhdGEpO1xuICAgIH07XG59XG5cbi8vIHNlbmRpbmcgb3V0Z29pbmcgbWVzc2FnZXNcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XG59XG5cbi8vIGFkZCBleHBvcnRzIGZvciBtZXRob2RzIHVzaW5nIGVuaGFuY2VkIG9iamVjdCBsaXRlcmFsIHN5bnRheC5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbml0LFxuICAgIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcixcbiAgICBzZW5kTWVzc2FnZVxufVxuIl19
