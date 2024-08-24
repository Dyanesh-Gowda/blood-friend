import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("userId");
  const hospitalId = localStorage.getItem("hospitalId");

  useEffect(() => {
    if (!userType || (!userId && !hospitalId)) {
      navigate("/");
    }
  }, [navigate, userType, userId, hospitalId]);

  return (
    <div>
      <h2>Profile Details</h2>
      {/* Render the profile details here */}
    </div>
  );
};

export default ProfileComponent;
