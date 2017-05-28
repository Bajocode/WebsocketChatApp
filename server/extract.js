var path = require('path');

var extractFilePath = (url) => {
    var filePath;
    var fileName = 'index.html';

    // If filename is given, replace default index
    if (url.length > 1) {
        fileName = url.substring(1);
    }
    return path.resolve(__dirname, '../app', fileName);
};

// Make available to that other modules can import with require
module.exports = extractFilePath;
