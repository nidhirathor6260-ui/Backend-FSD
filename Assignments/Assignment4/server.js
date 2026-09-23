const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = 5000;

const DATA_FILE = path.join(__dirname, "requests.json");

// Middleware
app.use(cors());
app.use(express.json());

// Make sure requests.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, "[]");
}

// Read requests from JSON file
const readRequests = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading requests.json:", error);
    return [];
  }
};

// Write requests to JSON file
const writeRequests = (requests) => {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(requests, null, 2)
  );
};

// ==========================================
// GET ALL REQUESTS
// GET /api/requests
// ==========================================

app.get("/api/requests", (req, res) => {
  const requests = readRequests();

  res.json(requests);
});

// ==========================================
// GET SINGLE REQUEST
// GET /api/requests/:id
// ==========================================

app.get("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const id = Number(req.params.id);

  const request = requests.find(
    (item) => item.id === id
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
});

// ==========================================
// CREATE REQUEST
// POST /api/requests
// ==========================================

app.post("/api/requests", (req, res) => {
  const requests = readRequests();

  const {
    studentName,
    email,
    category,
    description,
    priority,
  } = req.body;

  if (
    !studentName ||
    !email ||
    !category ||
    !description ||
    !priority
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const newRequest = {
    id:
      requests.length > 0
        ? Math.max(...requests.map((item) => item.id)) + 1
        : 1,

    studentName,
    email,
    category,
    description,
    priority,

    createdAt: new Date().toISOString(),
  };

  requests.push(newRequest);

  writeRequests(requests);

  res.status(201).json({
    message: "Request created successfully",
    request: newRequest,
  });
});

// ==========================================
// UPDATE REQUEST
// PUT /api/requests/:id
// ==========================================

app.put("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const id = Number(req.params.id);

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const {
    studentName,
    email,
    category,
    description,
    priority,
  } = req.body;

  if (
    !studentName ||
    !email ||
    !category ||
    !description ||
    !priority
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  requests[index] = {
    ...requests[index],

    studentName,
    email,
    category,
    description,
    priority,

    updatedAt: new Date().toISOString(),
  };

  writeRequests(requests);

  res.json({
    message: "Request updated successfully",
    request: requests[index],
  });
});

// ==========================================
// DELETE REQUEST
// DELETE /api/requests/:id
// ==========================================

app.delete("/api/requests/:id", (req, res) => {
  const requests = readRequests();

  const id = Number(req.params.id);

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const deletedRequest = requests.splice(index, 1)[0];

  writeRequests(requests);

  res.json({
    message: "Request deleted successfully",
    request: deletedRequest,
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});