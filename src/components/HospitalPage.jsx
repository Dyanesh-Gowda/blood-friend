// src/components/HospitalPage.jsx
import React, { useEffect, useState } from "react";
import { listHospitals } from "../services/user"; // Adjust the path as needed

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await listHospitals();
      console.log("Fetched hospitals:", response.data); // Debugging log
      setHospitals(response.data);
    };

    fetchHospitals();
  }, []);

  return (
    <div>
      <h2>Welcome to the Hospital Page</h2>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>{hospital.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalPage;
