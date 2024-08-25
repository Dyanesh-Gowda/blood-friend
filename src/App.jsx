import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HeaderComp from "./components/HeaderComp";
import FooterComp from "./components/FooterComp";
import LoginPage from "./components/LoginPage";

import Createl from "./components/Createl";
import UserComponent from "./components/UserComponent";
import HospitalComponent from "./components/HospitalComponent";
import Sidebar from "./components/Sidebar";
import UserDetailsComponent from "./components/UseDetailComponent";
import HospDetailsComponent from "./components/HospDetailsComponent";
import ListUserCOmponent from "./components/ListUserCOmponent";
import HospListComponent from "./components/HospListComponent";
import About from "./components/About";
import Contact from "./components/Contact";
import ProfileComponent from "./components/ProfileComponent";

const App = () => {
  const isAuthenticated = () => {
    const userType = localStorage.getItem("userType");
    return (
      userType &&
      (localStorage.getItem("userId") || localStorage.getItem("hospitalId"))
    );
  };

  return (
    <Router>
      <HeaderComp />
      <div className="app-container d-flex">
        <Sidebar />
        <div className="main-content flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/create-user" element={<Createl />} />
            <Route path="/user-form" element={<UserComponent />} />
            <Route path="/hosp-form" element={<HospitalComponent />} />
            <Route
              path="/users-list"
              element={
                isAuthenticated() ? <ListUserCOmponent /> : <Navigate to="/" />
              }
            />
            <Route
              path="/hosp-list"
              element={
                isAuthenticated() ? <HospListComponent /> : <Navigate to="/" />
              }
            />
            <Route path="/user/:userId" element={<UserDetailsComponent />} />
            <Route
              path="/hospital/:hospitalId"
              element={<HospDetailsComponent />}
            />
            <Route
              path="/about"
              element={isAuthenticated() ? <About /> : <Navigate to="/" />}
            />
            <Route
              path="/contact"
              element={isAuthenticated() ? <Contact /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={
                isAuthenticated() ? <ProfileComponent /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </div>
      <FooterComp />
    </Router>
  );
};

export default App;
