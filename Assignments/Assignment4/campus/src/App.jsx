import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    studentName: "",
    email: "",
    category: "",
    description: "",
    priority: "Low",
  });

  // Get all requests
  const getRequests = async () => {
    const response = await fetch("http://localhost:5000/api/requests");
    const data = await response.json();

    setRequests(data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const newRequest = await response.json();

    setRequests([...requests, newRequest]);

    setForm({
      studentName: "",
      email: "",
      category: "",
      description: "",
      priority: "Low",
    });
  };

  // Delete request
  const deleteRequest = async (id) => {
    await fetch(`http://localhost:5000/api/requests/${id}`, {
      method: "DELETE",
    });

    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <div className="container">

      <h1>Campus Help Desk</h1>

      <p className="subtitle">
        Submit and manage your campus-related problems
      </p>

      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <label>Student Name</label>
        <input
          type="text"
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Hostel">Hostel</option>
          <option value="Library">Library</option>
          <option value="Transport">Transport</option>
          <option value="Canteen">Canteen</option>
          <option value="Academic">Academic</option>
          <option value="Other">Other</option>
        </select>

        <label>Problem Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">
          Submit Request
        </button>

      </form>

      {/* REQUESTS */}

      <h2>Submitted Requests</h2>

      <div className="requests">

        {requests.map((request) => (

          <div className="card" key={request.id}>

            <h3>{request.category}</h3>

            <p>
              <b>Student:</b> {request.studentName}
            </p>

            <p>
              <b>Email:</b> {request.email}
            </p>

            <p>
              <b>Problem:</b> {request.description}
            </p>

            <p>
              <b>Priority:</b> {request.priority}
            </p>

            <button
              className="delete"
              onClick={() => deleteRequest(request.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;