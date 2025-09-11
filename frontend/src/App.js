import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });
  const [users, setUsers] = useState([]);

  // Fetch users from backend when page loads
  useEffect(() => {
    axios
      .get("http://3.102.210.115:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submit (create user)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://3.102.210.115:5000/api/users", formData)
      .then((res) => {
        setUsers([res.data, ...users]); // add new user at top
        setFormData({ firstName: "", lastName: "", phone: "", email: "" }); // reset form
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  // Handle delete user
  const handleDelete = (id) => {
    axios
      .delete(`http://3.102.210.115:5000/api/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ margin: "5px" }}
        />
        <button type="submit" style={{ margin: "5px" }}>
          Register
        </button>
      </form>

      <h3>Registered Users</h3>
      <ul>
        {users.length === 0 ? (
          <li>No users registered yet.</li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.phone} - {user.email}{" "}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

