import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "requests.json";

// GET ALL REQUESTS
app.get("/api/requests", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  const requests = JSON.parse(data);

  res.json(requests);
});

// GET REQUEST BY ID
app.get("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  const requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const request = requests.find((item) => item.id === id);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
});

// POST - ADD REQUEST
app.post("/api/requests", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  const requests = JSON.parse(data);

  const newRequest = {
    id: requests.length > 0
      ? Math.max(...requests.map((item) => item.id)) + 1
      : 1,

    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
  };

  requests.push(newRequest);

  fs.writeFileSync(
    FILE,
    JSON.stringify(requests, null, 2)
  );

  res.status(201).json(newRequest);
});

// PUT - UPDATE REQUEST
app.put("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  const requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  requests[index] = {
    id: id,
    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority,
  };

  fs.writeFileSync(
    FILE,
    JSON.stringify(requests, null, 2)
  );

  res.json(requests[index]);
});

// DELETE REQUEST
app.delete("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  let requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const oldLength = requests.length;

  requests = requests.filter(
    (item) => item.id !== id
  );

  if (requests.length === oldLength) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  fs.writeFileSync(
    FILE,
    JSON.stringify(requests, null, 2)
  );

  res.json({
    message: "Request deleted successfully",
  });
});

// START SERVER
app.listen(8000, () => {
  console.log(
    "Server running on http://localhost:8000"
  );
});