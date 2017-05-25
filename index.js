var http = require('http'); // Handle HTTP requests
var fs = require('fs'); // Read local files
var extract = require('./extract'); // handling and transforming file paths
var wss = require('./websocket-server'); // Let nodemon reload ws code too

// Error handler
var handleError = function(error, response) {
    response.writeHead(404);
    response.end('<H1>Sorry, page not found</H1>');
};

// Each request triggers the following callback
var server = http.createServer(function(request, response) {
    // Construct filepath for local requested file
    var filePath = extract(request.url);

    // Read local file and send response to browser
    fs.readFile(filePath, function(error, data) {
        if (error) {
            handleError(error, response);
            return;
        } else {
            response.end(data);
        }
    });
});

// Binding to port 3000
server.listen(3000);
