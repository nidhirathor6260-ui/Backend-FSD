import express from 'express';

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
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Nidhi", email: "nidhi@example.com" },
    { id: 2, name: "John", email: "john@example.com" }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json(users);
});

// app.put('/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const updatedUser = req.body;
//     const userIndex = users.findIndex(user => user.id === userId);
//     if (userIndex === -1) return res.status(404).send('User not found');
//     users[userIndex] = { ...users[userIndex], ...updatedUser };
//     res.json(users[userIndex]);
// });

// app.delete('/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(user => user.id === userId);
//     if (userIndex === -1) return res.status(404).send('User not found');
//     users.splice(userIndex, 1);
//     res.status(200).send('User deleted');
// });