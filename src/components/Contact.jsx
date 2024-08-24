import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/contact", {
        name,
        email,
        message,
      });
      setStatus("Message sent successfully! Thankyou!!!");
      // Optionally reset form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center lead">
          If you have any questions, feel free to reach out to us:
        </p>
        <ul className="list-unstyled my-4">
          <li className="d-flex align-items-center mb-3">
            <FaEnvelope size={24} className="me-2" />
            <strong>Email:</strong>{" "}
            <a href="mailto:support@bloodfriend.com">support@bloodfriend.com</a>
          </li>
          <li className="d-flex align-items-center mb-3">
            <FaPhone size={24} className="me-2" />
            <strong>Phone:</strong> <a href="tel:+919902975821">9902975821</a>
          </li>
          <li className="d-flex align-items-center">
            <FaMapMarkerAlt size={24} className="me-2" />
            <strong>Address:</strong> Bengaluru, Karnataka
          </li>
        </ul>
        <div className="mt-4">
          <h4 className="text-center">Send Us a Message</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <i className="bi bi-person-fill"></i> Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="bi bi-envelope"></i> Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                <i class="bi bi-chat-right"></i> Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message <i className="bi bi-send"></i>
            </button>
          </form>
          {status && <p className="text-center mt-3">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
