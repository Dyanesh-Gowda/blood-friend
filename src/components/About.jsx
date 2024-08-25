import React from "react";
import { FaUsers, FaHandshake, FaTachometerAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">About Us</h2>
        <p>
          Welcome to our application! We are dedicated to helping people connect
          and share resources for a better future. Our mission is to provide a
          platform where individuals can come together and support each other.
        </p>
        <p>
          Our team is passionate about making a difference, and we strive to
          create a user-friendly experience that meets the needs of our
          community. Thank you for being a part of our journey!
        </p>
        <div className="mt-4">
          <h3 className="text-center">Our Key Values</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <FaUsers size={40} className="mb-2" />
              <h4>Community</h4>
              <p>We believe in the power of community and mutual support.</p>
            </div>
            <div className="col-md-4 mb-3">
              <FaHandshake size={40} className="mb-2" />
              <h4>Collaboration</h4>
              <p>Working together to achieve common goals.</p>
            </div>
            <div className="col-md-4 mb-3">
              <FaTachometerAlt size={40} className="mb-2" />
              <h4>Innovation</h4>
              <p>
                Constantly improving and innovating to better serve our users.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/contact" className="btn btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
