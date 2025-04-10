import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const App: React.FC = () => {
  // const APIURL = "http://localhost:9067/api";
  const APIURL = "http://192.168.0.43:9067/api"; // test on Linux
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn apiurl={APIURL} />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp apiurl={APIURL} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute apiurl={APIURL}>
            <Home />
          </PrivateRoute>}
        />

        {/* Redirect any unknown route to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
