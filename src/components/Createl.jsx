import React from "react";
import "../App.css"; // Ensure the CSS file is imported
import { useNavigate } from "react-router-dom";

const Createl = () => {
  const navigate = useNavigate();

  function userB() {
    navigate("/user-form");
  }

  function HospB() {
    navigate("/hosp-form");
  }

  function cancelB() {
    navigate("/");
  }

  return (
    <div className="createl-container">
      <div className="image-section">
        <div className="section">
          <h3 className="section-title">Hospital/Foundations</h3>
          <div className="createl-image hospital-image"></div>
          <button className="btn btn-primary" onClick={HospB}>
            <i className="bi bi-hospital"></i> Click Here
          </button>
        </div>
        <div className="section">
          <h3 className="section-title">Blood Friend Users</h3>
          <div className="createl-image users-image"></div>
          <button className="btn btn-primary" onClick={userB}>
            <i className="bi bi-person"></i> Click Here
          </button>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={cancelB}>
        <i className="bi bi-x-circle"></i> Cancel
      </button>
    </div>
  );
};

export default Createl;
