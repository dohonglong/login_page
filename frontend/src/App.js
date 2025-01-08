import React, { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
// import Home from "./components/Home";
import Greetings from "./components/Greetings";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      {/* Navbar and logout condition */}
      {token ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}

      <Routes>
        {/* Home route, redirect to login if no token */}
        <Route
          path="/"
          element={
            !token ? <Navigate to="/login" /> : <Navigate to="/greetings" />
          }
        />
        {/* Login route */}
        <Route
          path="/login"
          element={
            !token ? (
              <Login setToken={setToken} />
            ) : (
              <Navigate to="/greetings" />
            )
          }
        />
        {/* Register route */}
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/greetings" />}
        />
        {/* Greetings route */}
        <Route
          path="/greetings"
          element={
            token ? <Greetings token={token} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
