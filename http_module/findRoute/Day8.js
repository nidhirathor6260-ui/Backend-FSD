import http from 'https';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
    if(req.url === '/about') {
    res.write('<h1>About Page</h1>');
    }else if(req.url === '/contact') { 
        res.end("<h1>Contact Page</h1>");
    }else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>Page Not Found</h1>");
    }
  res.end();
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});