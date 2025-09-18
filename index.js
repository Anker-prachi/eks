// index.js
const http = require('http');
const url = require('url');
const fs = require('fs');

// BAD: using user input directly in eval
http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const result = eval(query.code); // <-- Trigger RCE vulnerability
  res.end(`Result: ${result}`);
}).listen(8080);

// BAD: reading file path from user input
const userFile = process.argv[2];
fs.readFile(userFile, (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});



