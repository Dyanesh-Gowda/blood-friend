import React, { useEffect, useState } from "react";
import { listHospitals } from "../services/user";
import "bootstrap/dist/css/bootstrap.min.css";

const HospListComponent = () => {
  const [hospitals, setHospital] = useState([]);

  useEffect(() => {
    hospitL();
  }, []);

  function hospitL() {
    listHospitals()
      .then((response) => {
        setHospital(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">List of Hospitals/Foundations</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Hospital/Foundation ID</th>
            <th>Hospital/Foundation Name</th>
            <th>Hospital/Foundation Address</th>
            <th>Hospital/Contact No</th>
            <th>Hospital/Foundation Email</th>
            <th>Emergency/Urgency</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.name}</td>
              <td className="text-wrap" style={{ maxWidth: "250px" }}>
                {hospital.address}
              </td>
              <td>{hospital.phno}</td>
              <td>{hospital.email}</td>
              <td>
                {Object.keys(hospital.bloodTypes).length > 0 ? (
                  <div className="d-flex flex-wrap">
                    {Object.keys(hospital.bloodTypes).map((type) => (
                      <div
                        key={type}
                        className="p-2 m-1 border border-primary rounded text-center bg-light shadow-sm"
                        style={{ minWidth: "120px" }}
                      >
                        <strong>{type}</strong>: {hospital.bloodTypes[type]}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted">No data available</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospListComponent;
