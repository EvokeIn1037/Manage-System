import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/RoutingLogic/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ApiTest from "./pages/ApiTest"
import BettaIssueReport from "./pages/Table";

const App: React.FC = () => {
  // const BACKPUB = "http://localhost:9067/";
  // const BACKPUB = "http://10.23.103.80:9067/"; // test on Mac
  const BACKPUB = "http://192.168.0.43:9067/" // test on Linux
  const APIURL = BACKPUB + "api";
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn apiurl={APIURL} />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp apiurl={APIURL} />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute puburl={BACKPUB} apiurl={APIURL}>
            <Home puburl={BACKPUB} apiurl={APIURL} />
          </PrivateRoute>}
        />

        <Route path="/test" element={<ApiTest apiurl={APIURL} />} />

        <Route path="/table" element={<BettaIssueReport />} />

        {/* Redirect any unknown route to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
