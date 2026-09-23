// src/components/RequestForm.jsx
import React, { useState } from "react";

export default function RequestForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    priority: "Low",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", email: "", category: "", description: "", priority: "Low" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Student Name" required />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Problem Description" required />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
