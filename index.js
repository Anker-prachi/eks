// index.js
const http = require('http');
const url = require('url');

// BAD: Using eval() with user input - triggers CodeQL RCE alert
http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const result = eval(queryObject.input); // Vulnerability here
    res.end(`Result is: ${result}`);
}).listen(8080);
