// src/components/RequestList.jsx
import React from "react";

export default function RequestList({ requests, onDelete, onUpdate }) {
  return (
    <ul>
      {requests.map((r) => (
        <li key={r.id}>
          <b>{r.name}</b> ({r.email}) - {r.category} [{r.priority}]<br />
          {r.description}
          <button onClick={() => onDelete(r.id)}>Delete</button>
          <button onClick={() => onUpdate(r.id)}>Update Priority</button>
        </li>
      ))}
    </ul>
  );
}
