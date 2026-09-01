import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Hello, World!");
  res.write("<h1>Welcome to my server</h1>");
  res.end();
});


server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});