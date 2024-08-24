import React, { useEffect, useState } from "react";
import { listUsers } from "../services/user";
import "bootstrap/dist/css/bootstrap.min.css";

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Users</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>User Address</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Blood Group</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td className="text-wrap" style={{ maxWidth: "250px" }}>
                {user.address}
              </td>
              <td>{user.phno}</td>
              <td>{user.email}</td>
              <td>{user.bloodGroup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserComponent;
