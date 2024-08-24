import React, { useState } from "react";
import { checkEmailExists, createHospital } from "../services/user";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const HospitalComponent = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bloodTypes, setBloodTypes] = useState({
    Apos: 0,
    Aneg: 0,
    Bpos: 0,
    Bneg: 0,
    ABpos: 0,
    ABneg: 0,
    Opos: 0,
    Oneg: 0,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState({
    name: "",
    address: "",
    phno: "",
    email: "",
    password: "",
    bloodTypes: "",
    terms: "",
    general: "",
  });
  const navigate = useNavigate();

  const addUser = async (event) => {
    event.preventDefault();

    if (validateForm() && termsAccepted) {
      try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          setError((prevError) => ({
            ...prevError,
            email: "Email already exists",
          }));
          return;
        }

        const hospital = {
          name,
          address,
          phno,
          email,
          password,
          bloodTypes,
        };
        const response = await createHospital(hospital);
        const createdHospital = response.data;
        console.log(createdHospital);

        navigate("/");
      } catch (error) {
        console.error("Error creating hospital:", error);
        setError((prevError) => ({
          ...prevError,
          general:
            "An error occurred while creating the hospital. Please try again.",
        }));
      }
    } else if (!termsAccepted) {
      setError((prevError) => ({
        ...prevError,
        terms: "You must accept the terms and conditions",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...error };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Name is required";
      valid = false;
    }

    if (address.trim()) {
      errorsCopy.address = "";
    } else {
      errorsCopy.address = "Address is required";
      valid = false;
    }

    if (phno.trim()) {
      errorsCopy.phno = "";
    } else {
      errorsCopy.phno = "Contact number is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password)) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, and special characters";
      valid = false;
    }

    for (const type in bloodTypes) {
      if (bloodTypes[type] < 0) {
        errorsCopy.bloodTypes = "Blood type quantities must be non-negative";
        valid = false;
        break;
      } else {
        errorsCopy.bloodTypes = "";
      }
    }

    setError(errorsCopy);
    return valid;
  };

  const handleBloodTypeChange = (type, value) => {
    const intValue = parseInt(value, 10);
    setBloodTypes({
      ...bloodTypes,
      [type]: intValue >= 0 ? intValue : 0,
    });
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        {" "}
        <h4 className="text-center usersE">
          <i className="bi bi-pencil"></i>Enter Hospital
        </h4>
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            {error.general && (
              <div className="alert alert-danger" role="alert">
                {error.general}
              </div>
            )}
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  value={name}
                  className={`form-control ${error.name ? "is-invalid" : ""}`}
                  onChange={(event) => setName(event.target.value)}
                />
                {error.name && (
                  <div className="invalid-feedback">{error.name}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  name="address"
                  value={address}
                  className={`form-control ${
                    error.address ? "is-invalid" : ""
                  }`}
                  onChange={(event) => setAddress(event.target.value)}
                />
                {error.address && (
                  <div className="invalid-feedback">{error.address}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  name="phno"
                  minLength={10}
                  value={phno}
                  className={`form-control ${error.phno ? "is-invalid" : ""}`}
                  onChange={(event) => setPhno(event.target.value)}
                />
                {error.phno && (
                  <div className="invalid-feedback">{error.phno}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  className={`form-control ${error.email ? "is-invalid" : ""}`}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {error.email && (
                  <div className="invalid-feedback">{error.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  className={`form-control ${
                    error.password ? "is-invalid" : ""
                  }`}
                  onChange={(event) => setPassword(event.target.value)}
                />
                {error.password && (
                  <div className="invalid-feedback">{error.password}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Blood Types</label>
                {Object.keys(bloodTypes).map((type) => (
                  <div key={type} className="input-group mb-2">
                    <span className="input-group-text">{type}</span>
                    <input
                      type="number"
                      className={`form-control ${
                        error.bloodTypes ? "is-invalid" : ""
                      }`}
                      value={bloodTypes[type]}
                      onChange={(e) =>
                        handleBloodTypeChange(type, e.target.value)
                      }
                    />
                  </div>
                ))}
                {error.bloodTypes && (
                  <div className="invalid-feedback d-block">
                    {error.bloodTypes}
                  </div>
                )}
              </div>
              <div className="form-group form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I accept the{" "}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#termsModal"
                  >
                    terms and conditions
                  </button>
                </label>
                {error.terms && (
                  <div className="invalid-feedback d-block">{error.terms}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={addUser}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Terms and Conditions */}
      <div
        className="modal fade"
        id="termsModal"
        tabIndex="-1"
        aria-labelledby="termsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="termsModalLabel">
                Terms and Conditions
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                1. The hospital/foundation agrees to facilitate the coordination
                of blood donation requests from individuals in need of blood
                transfusions.
                <br />
                <br />
                2. The hospital/foundation will verify the authenticity and
                urgency of blood donation requests before forwarding them to
                potential donors.
                <br />
                <br />
                3. Personal information of individuals in need of blood will be
                kept confidential and will only be shared with potential donors
                with their consent.
                <br />
                <br />
                4. The hospital/foundation is responsible for accurately
                conveying the urgency and specific requirements of each blood
                donation request to potential donors.
                <br />
                <br />
                5. The hospital/foundation will ensure that all blood donation
                requests adhere to safety and medical standards to protect both
                donors and recipients.
                <br />
                <br />
                6. The hospital/foundation will maintain clear and timely
                communication with both donors and recipients throughout the
                blood donation process.
                <br />
                <br />
                7. The hospital/foundation is not liable for any unforeseen
                complications or outcomes related to the blood donation process.
                <br />
                <br />
                8. The hospital/foundation will provide accurate and up-to-date
                information regarding blood donation eligibility criteria to
                potential donors.
                <br />
                <br />
                9. The hospital/foundation will acknowledge and respect the
                voluntary nature of blood donation and ensure that donors are
                not coerced or pressured into donating blood.
                <br />
                <br />
                10. The hospital/foundation reserves the right to refuse or
                terminate blood donation requests if they are found to be in
                violation of any ethical or medical guidelines.
                <br />
                <br />
                11. Donors must meet all medical and health criteria set by
                relevant health authorities to be eligible for blood donation.
                <br />
                <br />
                12. Donors will be informed of any potential risks associated
                with blood donation and will provide informed consent before
                donating.
                <br />
                <br />
                13. The hospital/foundation will facilitate post-donation care
                and support to donors, ensuring their well-being after the
                donation process.
                <br />
                <br />
                14. The hospital/foundation will not engage in any form of
                financial compensation or reward for blood donation, in
                accordance with ethical guidelines.
                <br />
                <br />
                15. The hospital/foundation may use anonymized and aggregated
                data related to blood donation for research and reporting
                purposes.
                <br />
                <br />
                16. By participating in this blood donation program,
                hospitals/foundations and individuals in need of blood agree to
                abide by these terms and conditions.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setTermsAccepted(true)}
                data-bs-dismiss="modal"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalComponent;
