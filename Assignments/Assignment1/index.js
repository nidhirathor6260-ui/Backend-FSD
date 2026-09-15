// studentServer.js
import express from "express";
import http from "http";
import fs from "fs";

// Ensure students.json exists
const dataFile = "students.json";
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

// HTML form
const formHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Student Records</title>
</head>
<body>
  <h1>Welcome to Student Records App</h1>
  <form method="POST" action="/add">
    <label>Student Name:</label><br>
    <input type="text" name="name" required><br><br>
    
    <label>Roll Number:</label><br>
    <input type="text" name="roll" required><br><br>
    
    <label>Course:</label><br>
    <input type="text" name="course" required><br><br>
    
    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>
    
    <button type="submit">Add Student</button>
  </form>
  <br>
  <a href="/students">View All Students</a>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    // Serve form
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(formHTML);
  } 
  
  else if (req.url === "/add" && req.method === "POST") {
    // Collect form data
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const params = new URLSearchParams(body);
      const newStudent = {
        name: params.get("name"),
        roll: params.get("roll"),
        course: params.get("course"),
        email: params.get("email")
      };

      // Read existing data
      const students = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      students.push(newStudent);

      // Save back to file
      fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`<h2>Student Added Successfully!</h2><a href="/">Go Back</a>`);
    });
  } 
  
  else if (req.url === "/students" && req.method === "GET") {
    // Display student records
    const students = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Student Records</h1>");
    res.write("<ul>");
    students.forEach(stud => {
      res.write(`<li>${stud.name} | Roll: ${stud.roll} | Course: ${stud.course} | Email: ${stud.email}</li>`);
    });
    res.write("</ul>");
    res.write('<a href="/">Go Back</a>');
    res.end();
  } 
  
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(4000, () => {
  console.log("Server running at http://localhost:3000");
});
