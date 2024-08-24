import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, checkEmailExists } from "../services/user";
import "bootstrap/dist/js/bootstrap.bundle.min";

const UserComponent = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState({
    name: "",
    address: "",
    phno: "",
    email: "",
    bloodGroup: "",
    password: "",
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

        const user = { name, address, phno, email, bloodGroup, password };
        const response = await createUser(user);
        const createdUser = response.data;
        console.log(createdUser);

        // Redirect to the user profile page with userId
        navigate("/");
      } catch (error) {
        console.error("Error creating user:", error);
        setError((prevError) => ({
          ...prevError,
          general:
            "An error occurred while creating the user. Please try again.",
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

    if (name.trim()) errorsCopy.name = "";
    else {
      errorsCopy.name = "Name is required";
      valid = false;
    }

    if (address.trim()) errorsCopy.address = "";
    else {
      errorsCopy.address = "Address is required";
      valid = false;
    }

    if (phno.trim()) errorsCopy.phno = "";
    else {
      errorsCopy.phno = "Phone number is required";
      valid = false;
    }

    if (email.trim()) errorsCopy.email = "";
    else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    if (bloodGroup.trim()) errorsCopy.bloodGroup = "";
    else {
      errorsCopy.bloodGroup = "BloodGRoup is required";
      valid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(password)) errorsCopy.password = "";
    else {
      errorsCopy.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, and special characters";
      valid = false;
    }

    setError(errorsCopy);
    return valid;
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <h4 className="text-center usersE">
          Enter your Details <i className="bi bi-pencil"></i>
        </h4>
        <div className="card col-md-6 offset-md-3">
          <div className="card-body">
            {error.general && (
              <div className="alert alert-danger" role="alert">
                {error.general}
              </div>
            )}
            <form onSubmit={addUser}>
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
                  maxLength={10}
                  value={phno}
                  className={`form-control ${error.phno ? "is-invalid" : ""}`}
                  onChange={(event) => setPhno(event.target.value)}
                />
                {error.phno && (
                  <div className="invalid-feedback">{error.phno}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Blood Group</label>
                <input
                  type="text"
                  placeholder="Enter Your Blood Group"
                  name="bloodGroup"
                  value={bloodGroup}
                  className={`form-control ${
                    error.bloodGroup ? "is-invalid" : ""
                  }`}
                  onChange={(event) => setbloodGroup(event.target.value)}
                />
                {error.bloodGroup && (
                  <div className="invalid-feedback">{error.bloodGroup}</div>
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
              <button type="submit" className="btn btn-success">
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
                6. The hospital/foundation will provide timely updates to
                individuals in need of blood regarding the status of their
                requests and any progress made in finding suitable donors.
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
                data-bs-dismiss="modal"
                onClick={() => setTermsAccepted(true)}
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

export default UserComponent;
