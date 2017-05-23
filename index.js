var http = require('http');

var server = http.createServer(function(request, response) {
    console.log('Responding to a request');
    response.end('<h1>Hello, World</h1>');
});

// Binding to port 3000
server.listen(3000);
