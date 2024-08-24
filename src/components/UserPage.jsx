// src/components/UserPage.jsx
import React, { useEffect, useState } from "react";
import { listUsers } from "../services/user"; // Adjust the path as needed

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await listUsers();
      console.log("Fetched users:", response.data); // Debugging log
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Welcome to the User Page</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.phno}
            {user.blood_group}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
