import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const HeaderComp = () => {
  return (
    <header className="header bg-dark text-center text-white py-4">
      <div className="container">
        <h1 className="title fw-bold fst-normal">Blood Friend</h1>
        <p className="lead bg-light text-dark p-3 rounded">
          Empowering compassion, bridging hearts: BloodFriend, your beacon of
          hope
        </p>
      </div>
    </header>
  );
};

export default HeaderComp;
