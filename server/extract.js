var path = require('path');

var extractFilePath = function(url) {
    var filePath;
    var fileName = 'index.html';

    if (url.length > 1) {
        fileName = url.substring(1);
    }
    console.log('Filename: ' + fileName);

    return path.resolve(__dirname, '../app', fileName);
};

// Make available to that other modules can import with require
module.exports = extractFilePath;

// Usage: var filePath = extract(request.url);
