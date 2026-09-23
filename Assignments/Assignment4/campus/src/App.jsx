import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/requests";

function App() {
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    category: "Infrastructure",
    description: "",
    priority: "Medium",
  });

  // Get all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit / Update request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.studentName ||
      !formData.email ||
      !formData.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      await fetchRequests();

      setFormData({
        studentName: "",
        email: "",
        category: "Infrastructure",
        description: "",
        priority: "Medium",
      });

      setEditingId(null);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Something went wrong.");
    }
  };

  // Edit request
  const handleEdit = (request) => {
    setEditingId(request.id);

    setFormData({
      studentName: request.studentName,
      email: request.email,
      category: request.category,
      description: request.description,
      priority: request.priority,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete request
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      studentName: "",
      email: "",
      category: "Infrastructure",
      description: "",
      priority: "Medium",
    });
  };

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <h1>Campus Request Management</h1>
          <p>
            Submit and manage campus-related problems or requests
          </p>
        </header>

        {/* Form */}
        <section className="form-section">
          <h2>
            {editingId ? "Update Request" : "Submit a Request"}
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Infrastructure">
                    Infrastructure
                  </option>
                  <option value="Hostel">Hostel</option>
                  <option value="Library">Library</option>
                  <option value="Canteen">Canteen</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Transport">Transport</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

            </div>

            <div className="form-group">
              <label>Problem Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your problem or request..."
                rows="5"
                required
              ></textarea>
            </div>

            <div className="button-group">

              <button type="submit" className="submit-btn">
                {editingId ? "Update Request" : "Submit Request"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>

        {/* Requests */}
        <section className="requests-section">
          <div className="section-title">
            <h2>Submitted Requests</h2>
            <span>{requests.length} Requests</span>
          </div>

          {requests.length === 0 ? (
            <div className="empty">
              <p>No requests submitted yet.</p>
            </div>
          ) : (
            <div className="request-list">

              {requests.map((request) => (
                <div className="request-card" key={request.id}>

                  <div className="request-header">

                    <div>
                      <h3>{request.category}</h3>
                      <p className="student">
                        Submitted by: {request.studentName}
                      </p>
                    </div>

                    <span
                      className={`priority ${request.priority.toLowerCase()}`}
                    >
                      {request.priority}
                    </span>

                  </div>

                  <p className="description">
                    {request.description}
                  </p>

                  <p className="email">
                    📧 {request.email}
                  </p>

                  <div className="request-footer">

                    <span>
                      ID: #{request.id}
                    </span>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(request)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(request.id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;