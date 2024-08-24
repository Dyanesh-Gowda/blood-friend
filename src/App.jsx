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
import UserPage from "./components/UserPage";
import HospitalPage from "./components/HospitalPage";
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
            <Route
              path="/user"
              element={isAuthenticated() ? <UserPage /> : <Navigate to="/" />}
            />
            <Route
              path="/hospital"
              element={
                isAuthenticated() ? <HospitalPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/create-user"
              element={isAuthenticated() ? <Createl /> : <Navigate to="/" />}
            />
            <Route
              path="/user-form"
              element={
                isAuthenticated() ? <UserComponent /> : <Navigate to="/" />
              }
            />
            <Route
              path="/hosp-form"
              element={
                isAuthenticated() ? <HospitalComponent /> : <Navigate to="/" />
              }
            />
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
            <Route
              path="/user/:userId"
              element={
                isAuthenticated() ? (
                  <UserDetailsComponent />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/hospital/:hospitalId"
              element={
                isAuthenticated() ? (
                  <HospDetailsComponent />
                ) : (
                  <Navigate to="/" />
                )
              }
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
