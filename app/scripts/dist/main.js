(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    define the structure of messages and pass messages between and dom
*/

// ES6 class (constructor sorthand syntax)
var ChatApp = function ChatApp() {
    _classCallCheck(this, ChatApp);

    console.log('Hello ES6');
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

},{}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default(); /*
                         Initializes the application
                     */

},{"./app":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QUFJQTtJQUNNLE8sR0FDRixtQkFBYztBQUFBOztBQUNWLFlBQVEsR0FBUixDQUFZLFdBQVo7QUFDSCxDOztBQUdMOzs7SUFDTSxXO0FBQ0YsK0JBSUc7QUFBQSxZQUhVLENBR1YsUUFIQyxPQUdEO0FBQUEsNkJBRkMsSUFFRDtBQUFBLFlBRk8sQ0FFUCw2QkFGVyxhQUVYO0FBQUEsa0NBREMsU0FDRDtBQUFBLFlBRFksQ0FDWixrQ0FEaUIsSUFBSSxJQUFKLEVBQUQsQ0FBYSxPQUFiLEVBQ2hCOztBQUFBOztBQUNDLGFBQUssT0FBTCxHQUFlLENBQWY7QUFDQSxhQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0g7QUFDRDs7Ozs7b0NBQ1k7QUFDUixtQkFBTyxFQUFFO0FBQ0wsc0JBQU0sS0FBSyxJQURSO0FBRUgseUJBQVMsS0FBSyxPQUZYO0FBR0gsMkJBQVcsS0FBSztBQUhiLGFBQVA7QUFLSDs7Ozs7O0FBR0w7QUFDQTs7QUFFQTtBQUNBOzs7a0JBQ2UsTzs7Ozs7QUNqQ2Y7Ozs7OztBQUNBLG9CLENBTEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAgICBkZWZpbmUgdGhlIHN0cnVjdHVyZSBvZiBtZXNzYWdlcyBhbmQgcGFzcyBtZXNzYWdlcyBiZXR3ZWVuIGFuZCBkb21cbiovXG5cbi8vIEVTNiBjbGFzcyAoY29uc3RydWN0b3Igc29ydGhhbmQgc3ludGF4KVxuY2xhc3MgQ2hhdEFwcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyBFUzYnKTtcbiAgICB9XG59XG5cbi8vIEFkZCB1c2VybmFtZSBldGMgdG8gbWVzc2FnZSBiZWZvcmUgc2VuZGluZyB0byBzZXJ2ZXJcbmNsYXNzIENoYXRNZXNzYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIG1lc3NhZ2U6IG0sXG4gICAgICAgIHVzZXI6IHUgPSAnd29uZGVyd29tYW4nLFxuICAgICAgICB0aW1lc3RhbXA6IHQgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXG4gICAgfSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgICAgICB0aGlzLnVzZXIgPSB1O1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IHQ7XG4gICAgfVxuICAgIC8vIHJlcHJlc2VudCB0aGUgZGF0YSBhcyBhIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0IGZvciBzb2NrZXQgc3RyZWFtLlxuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHsgLy8gSlNPTiBvYmplY3RcbiAgICAgICAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8vIChvbGQpIE5ldyBpbnN0YW5jZVxuLy8gbmV3IENoYXRBcHAoKTtcblxuLy8gSW4gRVM2IG1vZHVsZXMsIHlvdSBtdXN0IGV4cGxpY2l0bHkgZXhwb3J0IHRoZSBwaWVjZXMgb2YgeW91ciBtb2R1bGUgeW91XG4vLyB3YW50IG90aGVycyB0byB1c2VcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG4iLCIvKlxuICAgIEluaXRpYWxpemVzIHRoZSBhcHBsaWNhdGlvblxuKi9cblxuaW1wb3J0IENoYXRBcHAgZnJvbSAnLi9hcHAnO1xubmV3IENoYXRBcHAoKTtcbiJdfQ==
