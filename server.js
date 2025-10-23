const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring'); // for parsing form data

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Serve the HTML form
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/submit' && req.method === 'POST') {
    // Handle form submission
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const formData = qs.parse(body);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Message Received!</h1><p>Your message: ${formData.message}</p><a href="/">Go Back</a>`);
    });
  } else {
    // 404 Page
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
