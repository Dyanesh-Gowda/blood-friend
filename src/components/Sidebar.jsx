import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BsPerson,
  BsEnvelope,
  BsInfoCircle,
  BsBoxArrowRight,
} from "react-icons/bs";

const Sidebar = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const hospitalId = localStorage.getItem("hospitalId");

  const handleProfileClick = () => {
    if (userType === "user" && userId) {
      navigate(`/user/${userId}`);
    } else if (userType === "hospital" && hospitalId) {
      navigate(`/hospital/${hospitalId}`);
    } else {
      alert("Please log in to access your profile.");
      navigate("/");
    }
  };

  const handleContactClick = () => {
    if (userType && (userId || hospitalId)) {
      navigate("/contact");
    } else {
      alert("Please log in to access the contact page.");
      navigate("/");
    }
  };

  const handleAboutClick = () => {
    if (userType && (userId || hospitalId)) {
      navigate("/about");
    } else {
      alert("Please log in to access the about page.");
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("hospitalId");
    navigate("/");
  };

  return (
    <div className="sidebar bg-dark text-white vh-100 d-flex flex-column p-4">
      <button
        className="btn btn-dark text-white d-flex align-items-center mb-3 w-100"
        onClick={handleProfileClick}
        onMouseEnter={(e) => e.currentTarget.classList.add("btn-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("btn-hover")}
      >
        <BsPerson className="me-2" /> Profile
      </button>
      <button
        className="btn btn-dark text-white d-flex align-items-center mb-3 w-100"
        onClick={handleContactClick}
        onMouseEnter={(e) => e.currentTarget.classList.add("btn-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("btn-hover")}
      >
        <BsEnvelope className="me-2" /> Contact
      </button>
      <button
        className="btn btn-dark text-white d-flex align-items-center mb-3 w-100"
        onClick={handleAboutClick}
        onMouseEnter={(e) => e.currentTarget.classList.add("btn-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("btn-hover")}
      >
        <BsInfoCircle className="me-2" /> About
      </button>
      <button
        className="btn btn-danger text-white d-flex align-items-center mt-auto w-100"
        onClick={handleLogout}
        onMouseEnter={(e) => e.currentTarget.classList.add("btn-hover")}
        onMouseLeave={(e) => e.currentTarget.classList.remove("btn-hover")}
      >
        <BsBoxArrowRight className="me-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
