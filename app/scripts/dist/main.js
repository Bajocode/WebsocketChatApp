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
    // When connected, send pow!
    _wsClient2.default.registerOpenHandler(function () {
        var message = new ChatMessage({ message: 'pow!' });
        _wsClient2.default.sendMessage(message.serialize());
    });
    // Forwarded message
    _wsClient2.default.registerMessageHandler(function (data) {
        console.log(data);
    });
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

// In ES6 modules, you must explicitly export the pieces 


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNHQTs7Ozs7OzBKQUhBOzs7OztBQUtBO0lBQ00sTyxHQUNGLG1CQUFjO0FBQUE7O0FBQ1YsdUJBQU8sSUFBUCxDQUFZLHFCQUFaO0FBQ0E7QUFDQSx1QkFBTyxtQkFBUCxDQUEyQixZQUFNO0FBQzdCLFlBQUksVUFBVSxJQUFJLFdBQUosQ0FBZ0IsRUFBRSxTQUFTLE1BQVgsRUFBaEIsQ0FBZDtBQUNBLDJCQUFPLFdBQVAsQ0FBbUIsUUFBUSxTQUFSLEVBQW5CO0FBQ0gsS0FIRDtBQUlBO0FBQ0EsdUJBQU8sc0JBQVAsQ0FBOEIsVUFBQyxJQUFELEVBQVU7QUFDcEMsZ0JBQVEsR0FBUixDQUFZLElBQVo7QUFDSCxLQUZEO0FBR0gsQzs7QUFHTDs7O0lBQ00sVztBQUNGLCtCQUlHO0FBQUEsWUFIVSxDQUdWLFFBSEMsT0FHRDtBQUFBLDZCQUZDLElBRUQ7QUFBQSxZQUZPLENBRVAsNkJBRlcsYUFFWDtBQUFBLGtDQURDLFNBQ0Q7QUFBQSxZQURZLENBQ1osa0NBRGlCLElBQUksSUFBSixFQUFELENBQWEsT0FBYixFQUNoQjs7QUFBQTs7QUFDQyxhQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsYUFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGFBQUssU0FBTCxHQUFpQixDQUFqQjtBQUNIO0FBQ0Q7Ozs7O29DQUNZO0FBQ1IsbUJBQU8sRUFBRTtBQUNMLHNCQUFNLEtBQUssSUFEUjtBQUVILHlCQUFTLEtBQUssT0FGWDtBQUdILDJCQUFXLEtBQUs7QUFIYixhQUFQO0FBS0g7Ozs7OztBQUdMOzs7a0JBQ2UsTzs7Ozs7QUN2Q2Y7Ozs7OztBQUNBLG9CLENBTEE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7QUFLQTtBQUNBLElBQUksZUFBSjtBQUNBLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDZixhQUFTLElBQUksU0FBSixDQUFjLEdBQWQsQ0FBVDtBQUNBLFlBQVEsR0FBUixDQUFZLGNBQVo7QUFDSDs7QUFFRDtBQUNBLFNBQVMsbUJBQVQsQ0FBNkIsZUFBN0IsRUFBOEM7QUFDMUMsV0FBTyxNQUFQLEdBQWdCLFlBQU07QUFDbEIsZ0JBQVEsR0FBUixDQUFZLE1BQVo7QUFDQTtBQUNILEtBSEQ7QUFJSDs7QUFFRDtBQUNBLFNBQVMsc0JBQVQsQ0FBZ0MsZUFBaEMsRUFBaUQ7QUFDN0MsV0FBTyxTQUFQLEdBQW1CLFVBQUMsQ0FBRCxFQUFPO0FBQ3RCLGdCQUFRLEdBQVIsQ0FBWSxTQUFaLEVBQXVCLEVBQUUsSUFBekI7QUFDQSxZQUFJLE9BQU8sS0FBSyxLQUFMLENBQVcsRUFBRSxJQUFiLENBQVg7QUFDQSx3QkFBZ0IsSUFBaEI7QUFDSCxLQUpEO0FBS0g7O0FBRUQ7QUFDQSxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDMUIsV0FBTyxJQUFQLENBQVksS0FBSyxTQUFMLENBQWUsT0FBZixDQUFaO0FBQ0g7O0FBRUQ7a0JBQ2U7QUFDWCxjQURXO0FBRVgsNENBRlc7QUFHWCxrREFIVztBQUlYO0FBSlcsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuICAgIGRlZmluZSB0aGUgc3RydWN0dXJlIG9mIG1lc3NhZ2VzIGFuZCBwYXNzIG1lc3NhZ2VzIGJldHdlZW4gYW5kIGRvbVxuKi9cbmltcG9ydCBzb2NrZXQgZnJvbSAnLi93cy1jbGllbnQnO1xuXG4vLyBFUzYgY2xhc3MgKGNvbnN0cnVjdG9yIHNvcnRoYW5kIHN5bnRheClcbmNsYXNzIENoYXRBcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzb2NrZXQuaW5pdCgnd3M6Ly9sb2NhbGhvc3Q6MzAwMScpO1xuICAgICAgICAvLyBXaGVuIGNvbm5lY3RlZCwgc2VuZCBwb3chXG4gICAgICAgIHNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gbmV3IENoYXRNZXNzYWdlKHsgbWVzc2FnZTogJ3BvdyEnfSk7XG4gICAgICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UobWVzc2FnZS5zZXJpYWxpemUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBGb3J3YXJkZWQgbWVzc2FnZVxuICAgICAgICBzb2NrZXQucmVnaXN0ZXJNZXNzYWdlSGFuZGxlcigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gQWRkIHVzZXJuYW1lIGV0YyB0byBtZXNzYWdlIGJlZm9yZSBzZW5kaW5nIHRvIHNlcnZlclxuY2xhc3MgQ2hhdE1lc3NhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgbWVzc2FnZTogbSxcbiAgICAgICAgdXNlcjogdSA9ICd3b25kZXJ3b21hbicsXG4gICAgICAgIHRpbWVzdGFtcDogdCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcbiAgICB9KSB7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG07XG4gICAgICAgIHRoaXMudXNlciA9IHU7XG4gICAgICAgIHRoaXMudGltZXN0YW1wID0gdDtcbiAgICB9XG4gICAgLy8gcmVwcmVzZW50IHRoZSBkYXRhIGFzIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QgZm9yIHNvY2tldCBzdHJlYW0uXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4geyAvLyBKU09OIG9iamVjdFxuICAgICAgICAgICAgdXNlcjogdGhpcy51c2VyLFxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgICAgICAgdGltZXN0YW1wOiB0aGlzLnRpbWVzdGFtcFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLy8gSW4gRVM2IG1vZHVsZXMsIHlvdSBtdXN0IGV4cGxpY2l0bHkgZXhwb3J0IHRoZSBwaWVjZXMgXG5leHBvcnQgZGVmYXVsdCBDaGF0QXBwO1xuIiwiLypcbiAgICBJbml0aWFsaXplcyB0aGUgYXBwbGljYXRpb25cbiovXG5cbmltcG9ydCBDaGF0QXBwIGZyb20gJy4vYXBwJztcbm5ldyBDaGF0QXBwKCk7XG4iLCIvKlxuICAgIC0gbWFuYWdlIHRoZSBXZWJTb2NrZXRzIGNvbW11bmljYXRpb24gZm9yIHRoZSBjbGllbnRcbiAgICAtIGNvbW11bmljYXRpbmcgd2l0aCB5b3VyIE5vZGUgV2ViU29ja2V0IHNlcnZlciBmcm9tIGNsaWVudC5cbiovXG5cbi8vIGNvbm5lY3RpbmcgdG8gdGhlIHNlcnZlclxubGV0IHNvY2tldDtcbmZ1bmN0aW9uIGluaXQodXJsKSB7XG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdDb25uZWN0aW5nLi4nKTtcbn1cblxuLy8gcGVyZm9ybWluZyBpbml0aWFsIHNldHVwIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZmlyc3Qgb3BlbmVkXG5mdW5jdGlvbiByZWdpc3Rlck9wZW5IYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xuICAgIHNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XG4gICAgICAgIGhhbmRsZXJGdW5jdGlvbigpO1xuICAgIH07XG59XG5cbi8vIGZvcndhcmRpbmcgaW5jb21pbmcgbWVzc2FnZXMgdG8gdGhlaXIgaGFuZGxlcnNcbmZ1bmN0aW9uIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XG4gICAgc29ja2V0Lm9uTWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlJywgZS5kYXRhKTtcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgIGhhbmRsZXJGdW5jdGlvbihkYXRhKTtcbiAgICB9O1xufVxuXG4vLyBzZW5kaW5nIG91dGdvaW5nIG1lc3NhZ2VzXG5mdW5jdGlvbiBzZW5kTWVzc2FnZShwYXlsb2FkKSB7XG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpO1xufVxuXG4vLyBhZGQgZXhwb3J0cyBmb3IgbWV0aG9kcyB1c2luZyBlbmhhbmNlZCBvYmplY3QgbGl0ZXJhbCBzeW50YXguXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5pdCxcbiAgICByZWdpc3Rlck9wZW5IYW5kbGVyLFxuICAgIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXG4gICAgc2VuZE1lc3NhZ2Vcbn1cbiJdfQ==
