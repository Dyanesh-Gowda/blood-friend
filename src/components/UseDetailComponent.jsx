import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../services/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure Bootstrap Icons are included

const UserDetailsComponent = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(userId);
        const userData = response.data;
        setUser(userData);
        setName(userData.name || "");
        setAddress(userData.address || "");
        setPhno(userData.phno || "");
        setBloodGroup(userData.bloodGroup || "");
        setEmail(userData.email || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (showPasswordFields && password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const updatedUser = {
      name,
      address,
      phno,
      bloodGroup,
      password: showPasswordFields ? password : user.password,
    };

    try {
      await updateUser(userId, updatedUser);
      alert("User updated successfully.");
      setEditMode(false);
      setShowPasswordFields(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h2>
            <i className="bi bi-person"></i> User Details
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="form-group mb-2">
              <label className="form-label">
                <i className="bi bi-person-fill"></i> Full Name
              </label>
              <input
                type="text"
                value={name}
                readOnly={!editMode}
                className={`form-control ${!editMode ? "bg-light" : ""}`}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">
                <i className="bi bi-house-door"></i> Address
              </label>
              <input
                type="text"
                value={address}
                readOnly={!editMode}
                className={`form-control ${!editMode ? "bg-light" : ""}`}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">
                <i className="bi bi-telephone-fill"></i> Phone Number
              </label>
              <input
                type="tel"
                value={phno}
                readOnly={!editMode}
                className={`form-control ${!editMode ? "bg-light" : ""}`}
                onChange={(e) => setPhno(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">
                <i className="bi bi-droplet"></i> Blood Group
              </label>
              <input
                type="text"
                value={bloodGroup}
                readOnly={!editMode}
                className={`form-control ${!editMode ? "bg-light" : ""}`}
                onChange={(e) => setBloodGroup(e.target.value)}
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label">
                <i className="bi bi-envelope"></i> Email
              </label>
              <input
                type="email"
                value={email}
                className="form-control bg-light"
                readOnly
              />
            </div>
            {editMode && (
              <>
                {!showPasswordFields && (
                  <button
                    type="button"
                    className="btn btn-warning mb-2"
                    onClick={() => setShowPasswordFields(true)}
                  >
                    <i className="bi bi-key"></i> Change Password
                  </button>
                )}
                {showPasswordFields && (
                  <>
                    <div className="form-group mb-2">
                      <label className="form-label">
                        <i className="bi bi-key"></i> New Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-2">
                      <label className="form-label">
                        <i className="bi bi-key-fill"></i> Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordConfirm}
                        className="form-control"
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className={`btn ${editMode ? "btn-danger" : "btn-primary"}`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
              {editMode && (
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-save"></i> Update
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(`/hosp-list`)}
              >
                <i className="bi bi-arrow-left"></i> Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsComponent;
