import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHospital, updateHospital } from "../services/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const HospDetailsComponent = () => {
  const { hospitalId } = useParams();
  const [hospital, setHospital] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");
  const [email, setEmail] = useState("");
  const [bloodTypes, setBloodTypes] = useState({});
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      setLoading(true);
      try {
        if (hospitalId) {
          const response = await getHospital(hospitalId);
          const hospitalData = response.data;
          setHospital(hospitalData);
          setName(hospitalData.name);
          setAddress(hospitalData.address);
          setPhno(hospitalData.phno);
          setEmail(hospitalData.email);
          setBloodTypes(hospitalData.bloodTypes);
        } else {
          setError("Hospital ID is undefined");
        }
      } catch (error) {
        console.error(
          "Error fetching Hospital Details:",
          error.response?.data || error.message
        );
        setError("An error occurred while fetching Hospital data.");
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [hospitalId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (showPasswordFields && password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const updatedHospital = {
      name,
      address,
      phno,
      bloodTypes,
      password: showPasswordFields ? password : hospital.password, // Use existing password if not updated
    };

    try {
      await updateHospital(hospitalId, updatedHospital);
      alert("Hospital updated successfully.");
      setEditMode(false);
      setShowPasswordFields(false);
    } catch (error) {
      console.error("Error updating hospital:", error);
      alert("Failed to update hospital.");
    }
  };

  if (loading) return <p>Loading....</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h2>
            <i className="bi bi-hospital"></i> Hospital Details
          </h2>
        </div>
        <div className="card-body">
          {hospital ? (
            <form onSubmit={handleUpdate}>
              <div className="form-group mb-2">
                <label className="form-label">
                  <i className="bi bi-building"></i> Name
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
                  <i className="bi bi-geo-alt"></i> Address
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
                  <i className="bi bi-telephone"></i> Contact
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
                  <i className="bi bi-envelope"></i> Email
                </label>
                <input
                  type="email"
                  value={email}
                  className="form-control bg-light"
                  readOnly
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">
                  <i className="bi bi-droplet"></i> Blood Types
                </label>
                <input
                  type="text"
                  value={Object.entries(bloodTypes)
                    .map(([type, quantity]) => `${type}: ${quantity}`)
                    .join(", ")}
                  readOnly={!editMode}
                  className={`form-control ${!editMode ? "bg-light" : ""}`}
                  onChange={(e) => setBloodTypes(e.target.value)}
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
                      <i className="bi bi-lock"></i> Change Password
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
                          <i className="bi bi-key-fill"></i> Confirm New
                          Password
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
              <div className="d-flex justify-content-center mt-4">
                {editMode && (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => {
                        setEditMode(false);
                        setShowPasswordFields(false);
                      }}
                    >
                      <i className="bi bi-x-circle"></i> Cancel
                    </button>
                    <button type="submit" className="btn btn-success me-2">
                      <i className="bi bi-check-circle"></i> Update
                    </button>
                  </>
                )}
                {!editMode && (
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => setEditMode(true)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                )}
                <button
                  type="button"
                  className={`btn btn-danger me-2${!editMode ? "ms-2" : ""}`}
                  onClick={() => navigate("/users-list")}
                >
                  <i className="bi bi-arrow-left-circle"></i> Back
                </button>
              </div>
            </form>
          ) : (
            <p className="text-danger">No Hospital data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospDetailsComponent;
